import { StyleSheet, View } from 'react-native';
import { Link } from 'react-router-native';
import Text from './Text';

const styles = StyleSheet.create({
  container: {
    
  },
  text: {
    padding: 16,
    color: '#ffffff'
  }
});


const AppBarTab = ({ text, link }) => {
  return (
    <View styles={styles.container}>
      <Link to={link} >
        <Text style={styles.text} fontWeight={"bold"} >{text}</Text>
      </Link>
    </View>
  );
};

export default AppBarTab;