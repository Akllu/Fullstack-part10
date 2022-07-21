import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import { useNavigate } from 'react-router-native';

import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import Text from './Text';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

export const RepositoryListContainer = ({ repositories, loading }) => {
  const navigate = useNavigate();
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <>
      {loading
        ? <Text fontSize={'subheading'}>Loading...</Text>
        : <FlatList  
            data={repositoryNodes}
            ItemSeparatorComponent={ItemSeparator}
            renderItem={({ item }) => (
              <Pressable onPress={() => navigate(`/${item.id}`)}>
                <RepositoryItem item={item} />
              </Pressable> 
            )}
            keyExtractor={item => item.id}
          />
      }
    </>
  );
};

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
  const { repositories, loading } = useRepositories();

  return <RepositoryListContainer repositories={repositories} loading={loading} />
};

export default RepositoryList;