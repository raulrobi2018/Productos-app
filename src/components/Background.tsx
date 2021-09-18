import React from 'react';
import {View} from 'react-native';

export const Background = () => {
  return (
    <View
      style={{
        position: 'absolute',
        backgroundColor: '#00bfff',
        width: 1000,
        height: 1200,
        top: -300,
        transform: [{rotate: '-60deg'}],
      }}></View>
  );
};
