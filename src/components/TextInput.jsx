import { TextInput as NativeTextInput, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  input: {
    borderWidth: 1.5,
    borderColor: '#a9a9a9',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
});

const TextInput = ({ style, error, ...props }) => {
  const textInputStyle = [
    style, styles.input, error
  ];

  return <NativeTextInput style={textInputStyle} {...props} />;
};

export default TextInput;