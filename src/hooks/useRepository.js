import { useQuery } from '@apollo/client';

import { GET_REPOSITORY } from '../graphql/queries'

const useRepository = ({ repositoryId, first }) => {
  const { data, loading, refetch, fetchMore } = useQuery(GET_REPOSITORY, {
    variables: {
      repositoryId,
      first
    },
    fetchPolicy: 'cache-and-network',
    onError: (e) => console.error(e),
  });

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repository.reviews.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        repositoryId,
        after: data.repository.reviews.pageInfo.endCursor
      },
    });
  };

  return {
    repository: data?.repository,
    loading,
    refetch,
    fetchMore: handleFetchMore
  };
};

export default useRepository;
