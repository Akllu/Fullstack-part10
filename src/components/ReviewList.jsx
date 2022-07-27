import { useQuery } from '@apollo/client';
import { CHECK_LOGGED_USER } from '../graphql/queries';
import { View, FlatList } from "react-native";

import Text from './Text';
import ItemSeparator from './ItemSeparator';
import ReviewItem from './ReviewItem';

const ReviewList = () => {
  const { data, loading, refetch } = useQuery(CHECK_LOGGED_USER, {
    variables: {
      includeReviews: true
    },
    fetchPolicy: 'cache-and-network',
    onError: (e) => console.error(e),
  });

  const reviewNodes = data
  ? data.me.reviews.edges.map((edge) => edge.node)
  : [];

  return (
    <View>
      {!loading 
        ? <FlatList
          data={reviewNodes}
          ItemSeparatorComponent={ItemSeparator}
          ListFooterComponent={<View style={{ marginBottom: 100 }}/>}
          renderItem={({ item }) => <ReviewItem review={item} myReview={true} refetch={refetch} />}
          keyExtractor={({ id }) => id }
          />
        : <Text fontSize={'subheading'}>Loading...</Text>
      }
    </View>
  );
};

export default ReviewList;