import React, {useContext} from 'react';
import {Button, Text, View} from 'react-native';
import {AuthContext} from '../context/AuthContext';

export const ProtectedScreen = () => {
  const {user, token, logOut} = useContext(AuthContext);

  return (
    <View>
      <Text>Protected</Text>
      <Button title="logout" color="#00bfff" onPress={logOut} />

      <Text>{JSON.stringify(user, null, 5)}</Text>
    </View>
  );
};
