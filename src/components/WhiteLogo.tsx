import React from 'react';
import {Image, View} from 'react-native';

export const WhiteLogo = () => {
  return (
    <View style={{alignItems: 'center', marginBottom: 30}}>
      <Image
        source={require('../assets/react-logo-white.png')}
        style={{width: 110, height: 100}}
      />
    </View>
  );
};
