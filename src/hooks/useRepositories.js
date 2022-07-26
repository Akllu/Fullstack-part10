import { useQuery } from '@apollo/client';

import { GET_REPOSITORIES } from '../graphql/queries'

const useRepositories = (sortOption, debounceQuery) => {

  const getVariables = (sortOption) => {
    switch (sortOption) {
      case 'RATING_AVERAGE_DESC':
        return {
          orderBy: 'RATING_AVERAGE',
          orderDirection: 'DESC',
          searchKeyword: debounceQuery
        }
      case 'RATING_AVERAGE_ASC':
        return {
          orderBy: 'RATING_AVERAGE',
          orderDirection: 'ASC',
          searchKeyword: debounceQuery
        }
      default:
        return {
          orderBy: 'CREATED_AT',
          orderDirection: 'DESC',
          searchKeyword: debounceQuery
        }
    }
  }

  const variables = getVariables(sortOption)

  const { data, loading, refetch } = useQuery(GET_REPOSITORIES, {
    variables: variables,
    fetchPolicy: 'cache-and-network',
    onError: (e) => console.error(e),
  });
  
  const repositories = data?.repositories;

  return { repositories, loading, refetch };
};

export default useRepositories;