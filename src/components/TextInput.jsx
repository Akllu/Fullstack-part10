import { TextInput as NativeTextInput, StyleSheet } from 'react-native';
import theme from '../theme';

const styles = StyleSheet.create({
  input: {
    borderWidth: 1.5,
    borderColor: '#a9a9a9',
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
  },
  error: {
    borderColor: theme.colors.errorColor,
  },
});

const TextInput = ({ style, error, ...props }) => {
  const textInputStyle = [
    style, styles.input, error && styles.error
  ];

  return <NativeTextInput style={textInputStyle} {...props} />;
};

export default TextInput;