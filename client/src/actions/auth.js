import { REGISTER_SUCCESS, REGISTER_FAIL, LOADED_FAIL, LOADED_USER } from './types'
import { setAlert } from './alert'
import axios from 'axios'
import {setAuthToken} from '../util/index'

export const register = ({ name, email, password }) => async dispatch => {
    const user = {
      name,
      email,
      password,
    };
    const body = JSON.stringify(user);
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json ',
        },
      };

      const response = await axios.post('/api/users/register', body, config);
        console.log(response);
        dispatch({
            type: REGISTER_SUCCESS,
            payload: response.data
        })
        
    } catch (error) {
        const errors = error.response.data.errors;

        if (errors) {
            errors.forEach(error=>setAlert(error.msg,'danger'))
        }

        dispatch({
            type:REGISTER_FAIL
        })
    }
}

export const loadUser = async dispatch => {
    
    if (localStorage.token) {
        setAuthToken(localStorage.token)
    }
    try {
        const res = await axios.get('/api/auth');
        dispatch({
            type: LOADED_USER,
            payload: res.user
        })
    } catch{
        
        dispatchEvent({
            type:LOADED_FAIL
        })
    }

}