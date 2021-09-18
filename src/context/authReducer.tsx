import {Usuario} from '../interfaces/authInterface';
// Cuando se crea un reducer, siempre hay que pensar ¿Como va a ser el state?

//Al crear esta interface significa que tendremos que crear un estado inicial de tipo AuthState
export interface AuthState {
  status: 'checking' | 'authenticated' | 'not-authenticated';
  token: string | null;
  errorMessage: string;
  user: Usuario | null;
}

type AuthAction =
  // Esto quiere decir que cuando se haga el signUp, tengo que mandar el payload
  | {type: 'signUp'; payload: {token: string; user: Usuario}}
  | {type: 'addError'; payload: string}
  | {type: 'removeError'}
  | {type: 'notAuthenticated'}
  | {type: 'logout'};

//El reducer debe resolverse únicamente con la información que está recibiendo como parámetro
//y tiene que regresar algo de tipo AuthState
export const authReducer = (
  state: AuthState,
  action: AuthAction,
): AuthState => {
  switch (action.type) {
    case 'addError':
      return {
        ...state,
        status: 'not-authenticated',
        token: null,
        errorMessage: action.payload,
        user: null,
      };
    case 'removeError':
      return {
        ...state,
        errorMessage: '',
      };
    case 'signUp':
      return {
        ...state,
        errorMessage: '',
        status: 'authenticated',
        token: action.payload.token,
        user: action.payload.user,
      };
    //Estas dos acciones hacen lo mismo
    case 'notAuthenticated':
    case 'logout':
      return {
        ...state,
        status: 'not-authenticated',
        token: null,
        user: null,
      };
    default:
      return state;
  }
};
