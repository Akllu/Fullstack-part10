import { View, FlatList } from 'react-native';
import { useParams } from 'react-router-native';

import useRepository from '../hooks/useRepository';
import RepositoryItem from './RepositoryList/RepositoryItem';
import ItemSeparator from '../components/ItemSeparator';
import ReviewItem from '../components/ReviewItem';
import Text from './Text';

const SingleRepository = () => {
  const params = useParams();
  const { repository, loading, fetchMore } = useRepository({
    repositoryId: params.id,
    first: 9
  });

  const reviewNodes = repository
  ? repository.reviews.edges.map((edge) => edge.node)
  : [];

  const onEndReach = () => {
    fetchMore();
  };

  return (
    <View>
      {!loading 
        ? <FlatList
          data={reviewNodes}
          ItemSeparatorComponent={ItemSeparator}
          ListFooterComponent={<View style={{ marginBottom: 100 }}/>}
          renderItem={({ item }) => <ReviewItem review={item} />}
          keyExtractor={({ id }) => id }
          ListHeaderComponent={() => <RepositoryItem item={repository} showSingle={true}/>}
          onEndReached={onEndReach}
          onEndReachedThreshold={0.5}
          />
        : <Text fontSize={'subheading'}>Loading...</Text>
      }
    </View>
  );
};

export default SingleRepository;
