import React, {useContext, useEffect, useState} from 'react';
import {View, Text, FlatList, RefreshControl} from 'react-native';
import {ProductsContext} from '../context/ProductsContext';
import {styles} from '../styles/productsStyles';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {StackScreenProps} from '@react-navigation/stack';
import {ProductsStackParams} from './ProductsNavigator';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

interface Props
  extends StackScreenProps<ProductsStackParams, 'ProductsScreen'> {}

export const ProductsScreen = ({navigation}: Props) => {
  const {products, loadProducts} = useContext(ProductsContext);

  const [isRefreshing, setIsRefreshing] = useState(false);

  const {top} = useSafeAreaInsets();

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.addButtonContainer}
          onPress={() => navigation.navigate('ProductScreen', {})}>
          <Text>Agregar</Text>
        </TouchableOpacity>
      ),
    });
  }, []);

  //TODO: pull to refresh
  const loadAllProducts = async () => {
    setIsRefreshing(true);
    await loadProducts().then(() => setIsRefreshing(false));
  };

  return (
    <View style={styles.container}>
      <FlatList
        // Le agrega un top porque en IOS queda detrás del knoch
        style={{marginTop: isRefreshing ? top : 0}}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={loadAllProducts}
            progressViewOffset={10}
            colors={['blue', 'green', 'red']}
            //Solo para Android
            progressBackgroundColor="white"
            //Solo para IOS
            style={{backgroundColor: 'white'}}
            title="Refreshing"
            titleColor="black"
          />
        }
        data={products}
        keyExtractor={p => p._id}
        renderItem={({item}) => (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() =>
              navigation.navigate('ProductScreen', {
                id: item._id,
                name: item.nombre,
              })
            }>
            <Text style={styles.productName}>{item.nombre}</Text>
          </TouchableOpacity>
        )}
        ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
      />
    </View>
  );
};
