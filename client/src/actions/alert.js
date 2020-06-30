import { v4 as uuid4 } from 'uuid';
import { SET_ALERT, REMOVE_ALERT } from './types';

export const setAlert = (msg, type) => dispatch => {
    const id = uuid4();
    dispatch({
        type: SET_ALERT,
        payload: { msg, type, id },
    });
    
    setTimeout(()=> dispatch({type:REMOVE_ALERT,payload:id}),5000)
}

