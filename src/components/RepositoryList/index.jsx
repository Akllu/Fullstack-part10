import { useState } from 'react';
import { useNavigate } from 'react-router-native';
import { useDebounce } from 'use-debounce';

import { RepositoryListContainer } from './RepositoryListContainer';
import useRepositories from '../../hooks/useRepositories';

const RepositoryList = () => {
  const [sortOption, setSortOption] = useState('CREATED_AT');
  const [searchQuery, setSearchQuery] = useState('');
  const [debounceQuery] = useDebounce(searchQuery, 500);

  const { repositories, loading, fetchMore } = useRepositories({
    first: 8,
    sortOption,
    debounceQuery
  });
  const navigate = useNavigate();

  const onEndReach = () => {
    fetchMore();
  };
  
  return (
    <RepositoryListContainer
      repositories={repositories}
      loading={loading}
      navigate={navigate}
      sortOption={sortOption}
      setSortOption={setSortOption}
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
      onEndReach={onEndReach}
    />
  );
};

export default RepositoryList;