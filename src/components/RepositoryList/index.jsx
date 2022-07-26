import { useState } from 'react';
import { useNavigate } from 'react-router-native';
import { useDebounce } from 'use-debounce';

import { RepositoryListContainer } from './RepositoryListContainer';
import useRepositories from '../../hooks/useRepositories';

const RepositoryList = () => {
  const [sortOption, setSortOption] = useState('CREATED_AT');
  const [searchQuery, setSearchQuery] = useState('');
  const [debounceQuery] = useDebounce(searchQuery, 500);

  const { repositories, loading } = useRepositories(sortOption, debounceQuery);
  const navigate = useNavigate();
  
  return (
    <RepositoryListContainer
      repositories={repositories}
      loading={loading}
      navigate={navigate}
      sortOption={sortOption}
      setSortOption={setSortOption}
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
    />
  );
};

export default RepositoryList;