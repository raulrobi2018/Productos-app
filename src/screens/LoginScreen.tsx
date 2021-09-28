import React, {useContext, useEffect} from 'react';
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {Background} from '../components/Background';
import {WhiteLogo} from '../components/WhiteLogo';
import {loginStyles} from '../styles/loginStyles';
import {useForm} from '../hooks/useForm';
import {StackScreenProps} from '@react-navigation/stack';
import {AuthContext} from '../context/AuthContext';
import {type} from 'os';

interface Props extends StackScreenProps<any, any> {}

export const LoginScreen = ({navigation}: Props) => {
  const {signIn, errorMessage, removeError} = useContext(AuthContext);

  const {email, password, onChange} = useForm({
    email: '',
    password: '',
  });

  useEffect(() => {
    if (errorMessage.length === 0) {
      return;
    }

    Alert.alert('Login incorrecto', errorMessage, [
      {
        text: 'Ok',
        onPress: removeError,
      },
    ]);
  }, [errorMessage]);

  const onLogin = () => {
    Keyboard.dismiss();

    signIn({correo: email, password});
  };

  return (
    <>
      <Background />

      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={loginStyles.container}>
          <WhiteLogo />
          {/* <Text style={loginStyles.title}>Login</Text> */}
          {/* <Text style={loginStyles.label}>Email:</Text> */}
          <TextInput
            style={loginStyles.input}
            placeholder="Email"
            placeholderTextColor="rgba(255,255,255,0.7)"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={value => onChange(value, 'email')}
            onSubmitEditing={onLogin}
            value={email}
          />
          <TextInput
            style={loginStyles.input}
            placeholder="Password"
            placeholderTextColor="rgba(255,255,255,0.7)"
            autoCapitalize="none"
            onChangeText={value => onChange(value, 'password')}
            onSubmitEditing={onLogin}
            value={password}
            secureTextEntry
          />

          <View style={loginStyles.buttonContainer}>
            <View style={loginStyles.loginButtonContainer}>
              <TouchableOpacity
                activeOpacity={0.8}
                style={loginStyles.loginButton}
                onPress={onLogin}>
                <Text style={loginStyles.buttonText}>Login</Text>
              </TouchableOpacity>
            </View>

            <View style={loginStyles.registerButtonContainer}>
              <TouchableOpacity
                style={loginStyles.registerButton}
                activeOpacity={0.8}
                // En lugar de utilizar el navigation.navigate, utilizo el replace para que destruya la
                // pantalla del login. Esto no va a permitir volver a la pantalla anterior
                onPress={() => navigation.replace('RegisterScreen')}>
                <Text style={loginStyles.buttonText}>Register</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </>
  );
};
