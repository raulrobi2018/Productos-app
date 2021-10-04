import React from 'react';
import {View, Text, FlatList} from 'react-native';
import {useContext} from 'react';
import {ProductsContext} from '../context/ProductsContext';
import {styles} from '../styles/productsStyles';
import {TouchableOpacity} from 'react-native-gesture-handler';

export const ProductsScreen = () => {
  const {products, loadProducts} = useContext(ProductsContext);

  //TODO: pull to refresh

  return (
    <View style={{flex: 1, marginHorizontal: 10}}>
      <FlatList
        data={products}
        keyExtractor={p => p._id}
        renderItem={({item}) => (
          <TouchableOpacity activeOpacity={0.8}>
            <Text style={styles.productName}>{item.nombre}</Text>
          </TouchableOpacity>
        )}
        ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
      />
    </View>
  );
};
