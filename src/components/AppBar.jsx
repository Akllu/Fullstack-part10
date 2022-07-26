import { View, StyleSheet, ScrollView } from 'react-native';
import { useQuery, useApolloClient } from '@apollo/client';
import useAuthStorage from '../hooks/useAuthStorage';
import { CHECK_LOGGED_USER } from '../graphql/queries';
import Constants from 'expo-constants';
import theme from '../theme';
import AppBarTab from './AppBarTab';

const styles = StyleSheet.create({
  flexContainer: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.appBarBackgroundColor,
    flexDirection: 'row',
  }
});

const AppBar = () => {
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();

  const { data } = useQuery(CHECK_LOGGED_USER, {
    fetchPolicy: 'cache-and-network',
    onError: (e) => console.error(e),
  });

  let loggedUser = null;
  data ? loggedUser = data.me : null

  const signOut = async () => {
    await authStorage.removeAccessToken();
    await apolloClient.resetStore();
  };

  return (
    <View style={styles.flexContainer}>
      <ScrollView horizontal>
        <AppBarTab text={'Repositories'} link={'/'}/>
        {loggedUser
          ? <>
              <AppBarTab text={'Create a review'} link={'/review'} />
              <AppBarTab text={'Sign out'} link={'/'} signOut={signOut} />
            </> 
          : <>
              <AppBarTab text={'Sign in'} link={'/signin'}/>
              <AppBarTab text={'Sign up'} link={'/signup'}/>
            </>
        }
      </ScrollView>
    </View>
  );
};

export default AppBar;