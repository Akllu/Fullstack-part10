import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { Formik } from 'formik';
import { useNavigate } from 'react-router-native';
import { useMutation } from '@apollo/client';
import * as yup from 'yup';

import { CREATE_USER } from '../graphql/mutations';
import FormikTextInput from './FormikTextInput'
import Text from './Text';
import useSignIn from '../hooks/useSignIn';
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
  username: yup
    .string()
    .max(30, 'Username must be shorter than 30 characters')
    .required('Username is required'),
  password: yup
    .string()
    .min(5, 'Password must be at least 5 characters')
    .max(50, 'Password must be shorter than 50 characters')
    .required('Password is required'),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords do not match')
    .required('Password confirmation is required'),
});

const SignUp = () => {
  const [createUser] = useMutation(CREATE_USER, {
    onError: (e) => console.error(e),
  });
  const [signIn] = useSignIn();
  let navigate = useNavigate();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      const { data } = await createUser({
        variables: {
          user: {
            username,
            password
          }
        }
      });

      if (data) {
        await signIn({ username, password });
        navigate("/", { replace: true });
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Formik
      initialValues={
        {
          username: '',
          password: '',
          passwordConfirmation: '' 
        }
      }
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => (
        <View style={styles.form}>
          <FormikTextInput name="username" placeholder="Username" />
          <FormikTextInput name="password" placeholder="Password" secureTextEntry={true} />
          <FormikTextInput name="passwordConfirmation" placeholder="Password confirmation" secureTextEntry={true} />
          <Pressable style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText} fontWeight={'bold'}>Sign up</Text>
          </Pressable>
        </View>
      )}
    </Formik>
  );
};

export default SignUp;