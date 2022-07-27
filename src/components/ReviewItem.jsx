import React from 'react';
import { View, StyleSheet, Pressable, Alert } from 'react-native';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-native';
import { useMutation } from '@apollo/client';

import { DELETE_REVIEW } from '../graphql/mutations';
import theme from '../theme';
import Text from './Text';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#ffffff',
  },
  ratingContainer: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    borderColor: theme.colors.primary,
    borderWidth: 2,
    marginVertical: 10,
    marginLeft: 10,
  },
  infoContainer: {
    padding: 10,
    width: '85%',
  },
  textContainer: {
    marginTop: 5,
  },
  buttonContainer: {
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    height: 60,
    padding: 10
  },
  repositoryButton: {
    backgroundColor: theme.colors.primary,
    width: 160,
    justifyContent: 'center',
    borderRadius: 5
  },
  deleteButton: {
    backgroundColor: theme.colors.errorColor,
    width: 160,
    justifyContent: 'center',
    borderRadius: 5
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
});

const ReviewItem = ({ review, myReview, refetch }) => {
  const [deleteMutation] = useMutation(DELETE_REVIEW, {
    onError: (e) => console.error(e),
  });
  let navigate = useNavigate();
  const date = format(new Date(review.createdAt), 'dd.MM.yyyy')

  const handleDelete = async () => {
    await deleteMutation({
      variables: {
        deleteReviewId: review.id
      }
    });

    refetch();
  };

  const confirmDelete = () => {
    Alert.alert(
      'Delete review',
      'Are you sure you want to delete this review?',
      [
        { text: 'Cancel' },
        { text: 'Delete', onPress: handleDelete }
      ]
    )
  };

  return (
    <View>
      <View style={styles.container}>
        <View style={styles.ratingContainer}>
          <Text color={'primary'} fontWeight={'bold'} >{review.rating}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text fontWeight={'bold'}>
            {myReview
              ? review.repository.name
              : review.user.username
            }
          </Text>
          <Text color={'textSecondary'} >{date}</Text>
          <View style={styles.textContainer}>
            <Text>{review.text}</Text>
          </View>
        </View>
      </View>
      {myReview && (
        <View style={styles.buttonContainer}>
          <Pressable style={styles.repositoryButton} onPress={() => navigate(`/${review.repository.id}`, { replace: true })}>
            <Text style={styles.buttonText} fontWeight={'bold'}>View repository</Text>
          </Pressable>
          <Pressable style={styles.deleteButton} onPress={confirmDelete}>
            <Text style={styles.buttonText} fontWeight={'bold'}>Delete review</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
};

export default ReviewItem;