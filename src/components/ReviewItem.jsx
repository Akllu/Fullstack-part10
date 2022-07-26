import React from 'react';
import { View, StyleSheet } from 'react-native';
import { format } from 'date-fns';

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
});

const ReviewItem = ({ review }) => {
  const date = format(new Date(review.createdAt), 'dd.MM.yyyy')

  return (
    <View style={styles.container}>
      <View style={styles.ratingContainer}>
        <Text color={'primary'} fontWeight={'bold'} >{review.rating}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text fontWeight={'bold'}>{review.user.username}</Text>
        <Text color={'textSecondary'} >{date}</Text>
        <View style={styles.textContainer}>
          <Text>{review.text}</Text>
        </View>
      </View>
    </View>
  );
};

export default ReviewItem;