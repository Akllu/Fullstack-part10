import { View, FlatList } from 'react-native';
import { useParams } from 'react-router-native';

import useRepository from '../hooks/useRepository';
import RepositoryItem from './RepositoryList/RepositoryItem';
import ItemSeparator from '../components/ItemSeparator';
import ReviewItem from '../components/ReviewItem';
import Text from './Text';

const SingleRepository = () => {
  const params = useParams();
  const { repository, loading } = useRepository(params.id);

  const reviewNodes = repository
  ? repository.reviews.edges.map((edge) => edge.node)
  : [];

  return (
    <View>
      {!loading 
        ? <FlatList
          data={reviewNodes}
          ItemSeparatorComponent={ItemSeparator}
          renderItem={({ item }) => <ReviewItem review={item} />}
          keyExtractor={({ id }) => id }
          ListHeaderComponent={() => <RepositoryItem item={repository} showSingle={true}/>}
          />
        : <Text fontSize={'subheading'}>Loading...</Text>
      }
    </View>
  );
};

export default SingleRepository;
