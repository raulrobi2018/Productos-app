import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const baseURL = 'http://192.168.0.113:3001/api';

const cafeApi = axios.create({baseURL});

//Esto es un middlewere de Axios
//Cualquier petición que haga pasará por aquí. Va a verificar si el token existe en el AsyncStorage
//y lo tomará para que cada petición lo tenga
cafeApi.interceptors.request.use(async config => {
  const token = await AsyncStorage.getItem('token');

  // Aquí le pongo 'x-token' entre comillas porque mi token se llama así y en javascript
  //daría error si le pusiera config.headers.x-token, por eso se computa de esta forma
  //Si se llamara 'token', se podría hacer así: config.headers.token
  if (token) {
    config.headers['x-token'] = token;
  }

  return config;
});

export default cafeApi;
