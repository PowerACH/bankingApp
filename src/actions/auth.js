import { SIGN_IN, BASE_API_URL } from '../utils/constants';
import axios from 'axios';
import { getErrors } from './errors'; //import for the getErrors action function

export const signIn = (user) => ({
  type: SIGN_IN,
  user
});

export const initiateLogin = (email, password) => {
  return async (dispatch) => {
    try {
      const result = await axios.post(`${BASE_API_URL}/signin`, {
        email,
        password
      });
      const user = result.data;
      localStorage.setItem('user_token', user.token);
      dispatch(signIn(user));
    } catch (error) {
      console.log('error');
      error.response && dispatch(getErrors(error.response.data)); //the response sent from the server will be available in error.respons.data object, which we add to the reducer
    }
  };
};

export const registerNewUser = (data) => {
  return async (dispatch) => {
    try {
      await axios.post(`${BASE_API_URL}/signup`, data);
      return { success: true };
    } catch (error) {
      console.log('error', error);
      return { success: false };
    }
  };
};