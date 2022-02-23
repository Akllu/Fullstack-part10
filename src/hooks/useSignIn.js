import { useMutation } from '@apollo/client';

import { AUTHENTICATE } from '../graphql/mutations';

const useSignIn = () => {
  const [mutate, result] = useMutation(AUTHENTICATE, {
    onError: (e) => console.error(e),
  });

  const signIn = async ({ username, password }) => {
    return await mutate({
      variables: {
        username, password 
      }
    });
  };

  return [signIn, result];
};

export default useSignIn;