import {
  CREATE_PROFILE,
  PROFILE_ERROR,
  CLEAR_PROFILE,
  POST_PROFILE,
} from './types';
import axios from 'axios';

export const createProfile = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/profile/me');
    dispatch({
      type: CREATE_PROFILE,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.res.statusText,
        status: error.res.status,
      },
    });
  }
};

export const postProfile = (profile, history) => async (dispatch) => {
  console.log('hi');
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify(profile);
  console.log(body);

  try {
    const response = axios.post('/api/profile', body, config);
    console.log(response);
    dispatch({
      type: POST_PROFILE,
      payload: response.data,
    });
    history.push('/dashboard');
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

export const clearProfile = () => (dispatch) => {
  dispatch({
    type: CLEAR_PROFILE,
  });
};
