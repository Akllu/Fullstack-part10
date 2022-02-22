import { View, Pressable, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import Text from './Text';
import FormikTextInput from './FormikTextInput'
import theme from '../theme';

const styles = StyleSheet.create({
  form: {
    backgroundColor: '#ffffff',
    padding: 15,
  },
  button: {
    backgroundColor: theme.colors.primary,
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    textAlign: 'center',
    color: '#ffffff',
    fontSize: 16,
  },
})

const SignIn = () => {
  return (
    <Formik
      initialValues={{ username: '', password: '' }}
      onSubmit={(values) => {console.log(values)}}
    >
      {({ handleSubmit }) => {
        return (
          <View style={styles.form}>
            <FormikTextInput name="username" placeholder="Username" />
            <FormikTextInput name="password" placeholder="Password" secureTextEntry={true} />
            <Pressable style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText} fontWeight={'bold'}>Sign in</Text>
            </Pressable>
          </View>
        );
      }}
    </Formik>
  );
};

export default SignIn;