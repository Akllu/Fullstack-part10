import { FlatList, View, StyleSheet } from 'react-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import Text from './Text';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
  const { repositories, loading } = useRepositories();

  const repositoryNodes = repositories
    ? repositories.edges.map(edge => edge.node)
    : [];

  return (
    <>
      {loading
        ? <Text fontSize={'subheading'}>Loading...</Text> 
        : <FlatList  
          data={repositoryNodes}
          ItemSeparatorComponent={ItemSeparator}
          renderItem={RepositoryItem}
          keyExtractor={item => item.id}
        />
      }
    </>
  );
};

export default RepositoryList;