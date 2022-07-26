import { Searchbar as Search } from 'react-native-paper';

const Searchbar = ({ style, searchQuery, setSearchQuery }) => {
  return (
    <Search
      style={style} 
      placeholder='Search'
      onChangeText={query => setSearchQuery(query)}
      value={searchQuery}
    />
  );
};

export default Searchbar;
