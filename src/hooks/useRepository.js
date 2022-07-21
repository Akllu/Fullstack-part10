import { useQuery } from '@apollo/client';

import { GET_REPOSITORY } from '../graphql/queries'

const useRepository = (repositoryId) => {
  const { data, loading, refetch } = useQuery(GET_REPOSITORY, {
    variables: { repositoryId: repositoryId},
    fetchPolicy: 'cache-and-network',
    onError: (e) => console.error(e),
  });
  
  const repository = data?.repository;

  return { repository, loading, refetch };
};

export default useRepository;
