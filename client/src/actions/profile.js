import { CREATE_PROFILE, PROFILE_ERROR, CLEAR_PROFILE } from './types'
import axios from 'axios';

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

export const clearProfile = () => dispatch => {
    dispatch({
        type:CLEAR_PROFILE
    })
}