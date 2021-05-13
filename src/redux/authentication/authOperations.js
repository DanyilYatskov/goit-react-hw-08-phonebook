import axios from 'axios';
import { toast } from 'react-toastify';
import authActions from './authActions';
const {
  registerRequest,
  registerSuccess,
  registerError,
  logoutRequest,
  logoutSuccess,
  logoutError,
  loginRequest,
  loginSuccess,
  loginError,
  getCurrentUserRequest,
  getCurrentUserSuccess,
  getCurrentUserError,
} = authActions;

axios.defaults.baseURL = 'https://connections-api.herokuapp.com/users';

const token = {
  set(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    axios.defaults.headers.common.Authorization = '';
  },
};

//Response BODY:
// {
//   "user": {
//     "name": "Adrian Cross123",
//     "email": "d123a@mail.com"
//   },
//   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDljZmI2ODVjMjkzNzAwMTVkYzM0YWUiLCJpYXQiOjE2MjA5MDA3MTJ9.evE9orGHubVSuRmeqCGG3hV9kOx1AJQ7pfktch89T3w"
// }

const register = userInfo => async dispatch => {
  dispatch(registerRequest());

  try {
    const response = await axios.post('/signup', userInfo);
    token.set(response.data.token);
    dispatch(registerSuccess(response.data));
  } catch (error) {
    dispatch(registerError(error.message));
  }
};

const logIn = userInfo => async dispatch => {
  dispatch(loginRequest());
  try {
    const { data } = await axios.post('/login', userInfo);
    token.set(data.token);
    dispatch(loginSuccess(data));
  } catch (error) {
    dispatch(loginError(error.message));
  }
};

const logOut = () => async dispatch => {
  dispatch(logoutRequest());
  try {
    await axios.post('/logout');
    token.unset();
    dispatch(logoutSuccess());
  } catch (error) {
    dispatch(logoutError(error.message));
  }
};

const getCurrentUser = () => async (dispatch, getState) => {
  //Забираем токен из стейта через getState()
  const {
    authentication: { token: persistedTokenOfLoggedUser },
  } = getState();

  if (!persistedTokenOfLoggedUser) {
    return;
  }

  token.set(persistedTokenOfLoggedUser);
  dispatch(getCurrentUserRequest());

  try {
    const { data } = await axios.get('/current');

    dispatch(getCurrentUserSuccess(data));
  } catch (error) {
    dispatch(getCurrentUserError(error.message));
  }
};

const authOperations = {
  register,
  logIn,
  logOut,
  getCurrentUser,
};

export default authOperations;
