import { View, Pressable, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import { useNavigate } from 'react-router-native';
import * as yup from 'yup';

import Text from './Text';
import FormikTextInput from './FormikTextInput'
import useSignIn from '../hooks/useSignIn';
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
    marginTop: 10,
  },
  buttonText: {
    textAlign: 'center',
    color: '#ffffff',
    fontSize: 16,
  },
})

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required('Username is required'),
  password: yup
    .string()
    .min(4, 'Password must be longer')
    .required('Password is required'),
});

export const SignInContainer = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={{ username: '', password: '' }}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => (
        <View style={styles.form}>
          <FormikTextInput name="username" placeholder="Username" />
          <FormikTextInput name="password" placeholder="Password" secureTextEntry={true} />
          <Pressable style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText} fontWeight={'bold'}>Sign in</Text>
          </Pressable>
        </View>
      )}
    </Formik>
  )
};

const SignIn = () => {
  let navigate = useNavigate();
  const [signIn] = useSignIn();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      const { data } = await signIn({ username, password });
      console.log(data);
      navigate("/", { replace: true });
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <SignInContainer onSubmit={onSubmit} />
  );
};

export default SignIn;