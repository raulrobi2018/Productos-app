import React, {useContext, useEffect} from 'react';
import {View, Text, Image} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {ProductsStackParams} from './ProductsNavigator';
import {
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import {styles} from '../styles/productStyles';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Picker} from '@react-native-picker/picker';
import {useCategories} from '../hooks/useCategories';
import {useForm} from '../hooks/useForm';
import {ProductsContext} from '../context/ProductsContext';

//Para recibir los props pasados en ProductsScreen, se define este props
//Luego puedo desestructurar el route que es el que me provee de los parámetros pasados en la navegación
interface Props
  extends StackScreenProps<ProductsStackParams, 'ProductScreen'> {}
//El navigation lo desestructuro para poder setear el título en options
export const ProductScreen = ({navigation, route}: Props) => {
  const {id = '', name = ''} = route.params;

  const {categories} = useCategories();

  const {loadProductById, addProduct, updateProduct} =
    useContext(ProductsContext);

  //Inicializamos nuestro formulario con valores instanciados mediante useForm
  const {_id, categoriaId, nombre, img, form, onChange, setFormValue} = useForm(
    {
      _id: id,
      categoriaId: '',
      nombre: name,
      img: '',
    },
  );

  useEffect(() => {
    navigation.setOptions({title: nombre ? nombre : 'Product name'});
  }, [nombre]);

  useEffect(() => {
    loadProduct();
  }, []);

  const loadProduct = async () => {
    if (id.length === 0) return;

    const product = await loadProductById(id);

    setFormValue({
      _id: id,
      categoriaId: product.categoria._id,
      img: product.img || '',
      nombre,
    });
  };

  const saveOrUpdate = async () => {
    if (id.length > 0) {
      updateProduct(categoriaId, nombre, id);
    } else {
      //Para evitar que envíe la categoría undefined, se hacen este control

      const tempCategoriaId = categoriaId || categories[0]._id;
      const product = await addProduct(tempCategoriaId, nombre);

      //Actualizo el valor del producto que está cambiando
      onChange(product._id, '_id');
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.label}>Name:</Text>
        <TextInput
          placeholder="Name"
          style={styles.textInput}
          value={nombre}
          onChangeText={value => onChange(value, 'nombre')}
        />
        <Text style={styles.label}>Category:</Text>

        <Picker
          selectedValue={categoriaId}
          onValueChange={value => onChange(value, 'categoriaId')}>
          {categories.map(c => (
            <Picker.Item label={c.nombre} value={c._id} key={c._id} />
          ))}
        </Picker>

        <TouchableOpacity
          style={styles.saveButtonContainer}
          onPress={() => {
            saveOrUpdate();
          }}
          activeOpacity={0.8}>
          <View>
            <Text style={styles.saveButtonText}>Save</Text>
          </View>
        </TouchableOpacity>

        {_id.length > 0 && (
          <View style={styles.actionsContainer}>
            <View style={styles.actions}>
              <Icon
                color="#00bfff"
                size={40}
                name="photo-camera"
                onPress={() => {}}
              />
              <Icon
                color="#00bfff"
                size={40}
                name="collections"
                onPress={() => {}}
              />
            </View>
          </View>
        )}

        {img.length > 0 && <Image source={{uri: img}} style={styles.img} />}
      </ScrollView>
    </View>
  );
};
