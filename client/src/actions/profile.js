import {
  CREATE_PROFILE,
  PROFILE_ERROR,
  CLEAR_PROFILE,
  POST_PROFILE,
  EDIT_EXPERIENCE,
  EDIT_EDUCATION,
  DELETE_EXPERIENCE,
  DELETE_EDUCATION
} from './types';
import api from '../util/api';
import axios from 'axios';

export const createProfile = () => async (dispatch) => {
  try {
    const res = await axios.get('api/profile/me');
    dispatch({
      type: CREATE_PROFILE,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
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
    const response = api.post('/profile', body, config);
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

// Add Experience

export const editExperience = (formData, history) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify(formData);

  try {
    const response = await axios.post('api/profile/experience', body, config);
    console.log('edit now');
    dispatch({
      type: EDIT_EXPERIENCE,
      payload: response.data,
    });

    history.push('/dashboard');
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

// Add Education

export const editEducation = (formData, history) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify(formData);
  try {
    const response = axios.post(
      'api/profile/experience/education',
      body,
      config
    );
    dispatch({
      type: EDIT_EDUCATION,
      payload: response.data,
    });

    history.push('/dashboard');
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

// Delete Experience

export const deleteExperience = (id) => async (dispatch) => {
  try {
    const response = await axios.delete(`api/profile/experience/${id}`);

    dispatch({
      type: DELETE_EXPERIENCE,
      payload: response.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

//Delete Education

export const deleteEdeucation = (id) => async (dispatch) => {
  try {
    const response = await axios.delete(`api/profile/education/${id}`);

    dispatch({
      type: DELETE_EDUCATION,
      payload: response.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};
