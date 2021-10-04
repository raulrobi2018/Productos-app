import React, {createContext, useEffect, useReducer} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Usuario,
  LoginResponse,
  LoginData,
  RegisterData,
} from '../interfaces/authInterface';
import {authReducer, AuthState} from './authReducer';
import cafeApi from '../api/cafeApi';

type AuthContextProps = {
  errorMessage: string;
  token: string | null;
  user: Usuario | null;
  //Para el token
  status: 'checking' | 'authenticated' | 'not-authenticated';
  signUp: (registerData: RegisterData) => void;
  signIn: (loginData: LoginData) => void;
  logOut: () => void;
  removeError: () => void;
};

const authInitialState: AuthState = {
  status: 'checking',
  token: null,
  user: null,
  errorMessage: '',
};

export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({children}: any) => {
  const [state, dispatch] = useReducer(authReducer, authInitialState);

  useEffect(() => {
    // Aquí el AsyncStorage no puede ser asincrono (async await) porque no pueden haber
    // ejecuciones asincronas en un useEffect
    checkToken();
  }, []);

  const checkToken = async () => {
    const token = await AsyncStorage.getItem('token');
    // Si no hay token
    if (!token) return dispatch({type: 'notAuthenticated'});
    // Si hay token
    const resp = await cafeApi.get('/auth');

    if (resp.status !== 200) {
      return dispatch({type: 'notAuthenticated'});
    }

    //Esto es opcional, si se quiere se puede generar un nuevo token aunque ya haya uno valido
    //Esto genera uno nuevamente con una vigencia nueva
    await AsyncStorage.setItem('token', resp.data.token);

    dispatch({
      type: 'signUp',
      payload: {
        token: resp.data.token,
        user: resp.data.usuario,
      },
    });
  };

  const signIn = async ({correo, password}: LoginData) => {
    try {
      await cafeApi
        .post<LoginResponse>('/auth/login', {
          correo,
          password,
        })
        .then(async data => {
          //   Hacemos el dispatch de la acción signUp y el reducer establecerá los nuevos
          // valores que allí especifique
          dispatch({
            type: 'signUp',
            payload: {
              token: data.data.token,
              user: data.data.usuario,
            },
          });

          //Guardo el token en el storage
          await AsyncStorage.setItem('token', data.data.token);
        })
        .catch(err => {
          console.log('Error de conexion', err);
        });
    } catch (error: any) {
      console.log('error');
      console.log(error.response.data);
      dispatch({
        type: 'addError',
        payload: error.response.data.msg || 'Información incorrecta',
      });
    }
  };

  const signUp = async ({correo, password, nombre}: RegisterData) => {
    try {
      const {data} = await cafeApi.post<LoginResponse>('/usuarios', {
        correo,
        password,
        nombre,
      });

      console.log('data', data);

      // Hacemos el dispatch de la acción signUp y el reducer establecerá los nuevos
      // valores que allí especifique
      dispatch({
        type: 'signUp',
        payload: {
          token: data.token,
          user: data.usuario,
        },
      });

      //Guardo el token en el storage
      await AsyncStorage.setItem('token', data.token);
    } catch (error: any) {
      console.log(error.response.status);
      dispatch({
        type: 'addError',
        payload: error.response.data.errors[0].msg || 'Revise la información',
      });
    }
  };

  const logOut = async () => {
    await AsyncStorage.removeItem('token');
    dispatch({type: 'logout'});
  };

  const removeError = () => {
    dispatch({type: 'removeError'});
  };

  return (
    <AuthContext.Provider
      value={{
        //El provider tiene que retornar todos los valores del AuthContextProps
        //El state tiene todos los otros valores que faltan
        ...state,
        signUp,
        signIn,
        logOut,
        removeError,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
