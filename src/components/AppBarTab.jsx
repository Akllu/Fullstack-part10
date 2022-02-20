import { StyleSheet, Pressable } from 'react-native';
import Text from './Text';

const styles = StyleSheet.create({
  container: {
    
  },
  text: {
    padding: 16,
  }
});


const AppBarTab = ({ text, handlePress }) => {
  return (
    <Pressable styles={styles.container} onPress={handlePress} >
      <Text style={styles.text} color={'appBarTabColor'} fontWeight={"bold"} >{text}</Text>
    </Pressable>
  );
};

export default AppBarTab;