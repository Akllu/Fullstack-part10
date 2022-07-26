import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-native';

import { CREATE_REVIEW } from '../graphql/mutations';
import FormikTextInput from './FormikTextInput'
import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
  form: {
    backgroundColor: '#ffffff',
    padding: 15,
  },
  button: {
    backgroundColor: theme.colors.primary,
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    textAlign: 'center',
    color: '#ffffff',
    fontSize: 16,
  },
});

const validationSchema = yup.object().shape({
  repositoryOwner: yup
    .string()
    .required('Repository owner name is required'),
  repositoryName: yup
    .string()
    .required('Repository name is required'),
  rating: yup
    .number()
    .min(0, 'Rating must be a number between 0 and 100')
    .max(100, 'Rating must be a number between 0 and 100')
    .required('Rating is required'),
  review: yup
    .string(),
});

const ReviewForm = () => {
  const [createReview] = useMutation(CREATE_REVIEW, {
    onError: (e) => console.error(e),
  });
  let navigate = useNavigate();

  const onSubmit = async (values) => {
    try {
      const { data } = await createReview({
        variables: {
          review: {
            repositoryName: values.repositoryName,
            ownerName: values.repositoryOwner,
            rating: Number(values.rating),
            text: values.review
          }
        }
      });

      if (data) {
        navigate(`/${data.createReview.repositoryId}`, { replace: true });
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Formik
      initialValues={
        {
          repositoryOwner: '',
          repositoryName: '',
          rating: '',
          review: '' 
        }
      }
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => (
        <View style={styles.form}>
          <FormikTextInput name="repositoryOwner" placeholder="Repository owner name" />
          <FormikTextInput name="repositoryName" placeholder="Repository name" />
          <FormikTextInput name="rating" placeholder="Rating between 0 and 100" />
          <FormikTextInput name="review" placeholder="Review" multiline={true} />
          <Pressable style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText} fontWeight={'bold'}>Create a review</Text>
          </Pressable>
        </View>
      )}
    </Formik>
  );
};

export default ReviewForm;
