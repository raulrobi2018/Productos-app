import React from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  View,
} from 'react-native';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';
import {StackScreenProps} from '@react-navigation/stack';
import {loginStyles} from '../styles/loginStyles';
import {WhiteLogo} from '../components/WhiteLogo';
import {useForm} from '../hooks/useForm';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface Props extends StackScreenProps<any, any> {}

export const RegisterScreen = ({navigation}: Props) => {
  const {email, password, name, onChange} = useForm({
    email: '',
    password: '',
    name: '',
  });

  const onRegister = () => {
    console.log(email, password, name);
    Keyboard.dismiss();
  };

  return (
    <>
      <KeyboardAvoidingView
        style={{flex: 1, backgroundColor: '#00bfff'}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={loginStyles.container}>
          <WhiteLogo />

          <TextInput
            style={loginStyles.input}
            placeholder="Name"
            placeholderTextColor="rgba(255,255,255,0.7)"
            keyboardType="default"
            autoCapitalize="words"
            onChangeText={value => onChange(value, 'name')}
            onSubmitEditing={onRegister}
            value={name}
          />

          <TextInput
            style={loginStyles.input}
            placeholder="Email"
            placeholderTextColor="rgba(255,255,255,0.7)"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={value => onChange(value, 'email')}
            onSubmitEditing={onRegister}
            value={email}
          />

          <TextInput
            style={loginStyles.input}
            placeholder="Password"
            placeholderTextColor="rgba(255,255,255,0.7)"
            autoCapitalize="none"
            onChangeText={value => onChange(value, 'password')}
            onSubmitEditing={onRegister}
            value={password}
            secureTextEntry
          />

          <View style={loginStyles.buttonContainer}>
            <View style={loginStyles.loginButtonContainer}>
              <TouchableOpacity
                activeOpacity={0.8}
                style={loginStyles.loginButton}
                onPress={onRegister}>
                <Text style={loginStyles.buttonText}>Register</Text>
              </TouchableOpacity>
            </View>
          </View>

          <Icon
            color="white"
            size={40}
            name="arrow-back"
            style={loginStyles.backButton}
            onPress={() => navigation.replace('LoginScreen')}
          />
        </View>
      </KeyboardAvoidingView>
    </>
  );
};
