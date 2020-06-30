import { REGISTER_SUCCESS, REGISTER_FAIL } from './types'
import { setAlert } from './alert'
import axios from 'axios'

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