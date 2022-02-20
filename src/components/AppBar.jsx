import { View, StyleSheet } from 'react-native';
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
  return (
    <View style={styles.flexContainer}>
      <AppBarTab text={'Repositories'} handlePress={() => {console.log('You pressed AppBarTab')}}/>
    </View>
  );
};

export default AppBar;