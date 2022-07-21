import { View } from 'react-native';
import { useParams } from 'react-router-native';
import useRepository from '../hooks/useRepository';
import RepositoryItem from './RepositoryItem';
import Text from './Text';

const SingleRepository = () => {
  const params = useParams();
  const { repository, loading } = useRepository(params.id);

  return (
    <View>
      {loading 
        ? <Text fontSize={'subheading'}>Loading...</Text>
        : <RepositoryItem item={repository} showSingle={true}/>
      }
    </View>
  );
};

export default SingleRepository;
