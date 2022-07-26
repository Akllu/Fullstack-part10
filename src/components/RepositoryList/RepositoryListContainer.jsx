import React from 'react';
import { FlatList, Pressable, StyleSheet } from 'react-native';

import RepositoryItem from './RepositoryItem';
import Searchbar from './Searchbar';
import DropdownSorter from './DropdownSorter';
import Text from '../Text';
import ItemSeparator from '../ItemSeparator';

const styles = StyleSheet.create({
  dropDown: {
    marginHorizontal: 15,
    marginVertical: 5,
  },
  searchBar: {
    marginHorizontal: 15,
    marginTop: 15,
  }
});

export class RepositoryListContainer extends React.Component {
  renderHeader = () => {
    const props = this.props;

    return (
      <>
        <Searchbar
          style={styles.searchBar}
          searchQuery={props.searchQuery}
          setSearchQuery={props.setSearchQuery}
        />
        <DropdownSorter
          style={styles.dropDown} 
          sortOption={props.sortOption}
          setSortOption={props.setSortOption}
        />
      </>
    );
  };


  render() {
    const props = this.props;
    
    const repositoryNodes = props.repositories
      ? props.repositories.edges.map((edge) => edge.node)
      : [];
      
    return (
      <>
        {!props.loading
          ? <FlatList  
              data={repositoryNodes}
              ItemSeparatorComponent={ItemSeparator}
              renderItem={({ item }) => (
              <Pressable onPress={() => props.navigate(`/${item.id}`)}>
                <RepositoryItem item={item} />
              </Pressable> 
              )}
              keyExtractor={item => item.id}
              ListHeaderComponent={this.renderHeader}
            />
          : <Text fontSize={'subheading'}>Loading...</Text>
        }
      </>
    );
  }
}