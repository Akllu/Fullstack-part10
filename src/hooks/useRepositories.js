import { useQuery } from '@apollo/client';

import { GET_REPOSITORIES } from '../graphql/queries'

const useRepositories = ({ first, sortOption, debounceQuery }) => {

  const getVariables = (sortOption) => {
    switch (sortOption) {
      case 'RATING_AVERAGE_DESC':
        return {
          first,
          orderBy: 'RATING_AVERAGE',
          orderDirection: 'DESC',
          searchKeyword: debounceQuery
        }
      case 'RATING_AVERAGE_ASC':
        return {
          first,
          orderBy: 'RATING_AVERAGE',
          orderDirection: 'ASC',
          searchKeyword: debounceQuery
        }
      default:
        return {
          first,
          orderBy: 'CREATED_AT',
          orderDirection: 'DESC',
          searchKeyword: debounceQuery
        }
    }
  }

  const variables = getVariables(sortOption)

  const { data, loading, refetch, fetchMore } = useQuery(GET_REPOSITORIES, {
    variables: variables,
    fetchPolicy: 'cache-and-network',
    onError: (e) => console.error(e),
  });

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.repositories.pageInfo.endCursor,
        ...variables,
      },
    });
  };

  return {
    repositories: data?.repositories,
    loading,
    refetch,
    fetchMore: handleFetchMore
  };
};

export default useRepositories;