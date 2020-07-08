import { CREATE_PROFILE, PROFILE_ERROR, CLEAR_PROFILE, POST_PROFILE} from './types'
import axios from 'axios';
import { application, json } from 'express';

export const createProfile = () => async dispatch => {
    try {

        const res = await axios.get('/api/profile/me');
        dispatch({
            type: CREATE_PROFILE,
            payload: res.data
        })
        
    } catch (error) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: error.response.statusText,
                status:error.response.status
            }
        })
    }

}

export const postProfile = (profile) => async dispatch => {
    
    const config = {
        headers: {
            'Content-Type':application/json
        }
    }

    const body = profile;

    try {

        const response = axios.post('/api/profile', body, config);
        dispatch({
            type: POST_PROFILE,
            payload:response.data
        })


        
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: error.response.statusText,
                status:error.response.status
            }
        })
    }


}

export const clearProfile = () => dispatch => {
    dispatch({
        type:CLEAR_PROFILE
    })
}