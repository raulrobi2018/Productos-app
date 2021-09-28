import React from 'react';
import {ActivityIndicator, View} from 'react-native';

export const LoadingScreen = () => {
  return (
    <View>
      <ActivityIndicator
        size={50}
        color="black"
        style={{flex: 1, justifyContent: 'center', alignItems = 'center'}}
      />
    </View>
  );
};
