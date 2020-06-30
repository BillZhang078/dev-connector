import { REQUEST_SUCCESS, REQUEST_FAIL } from './types'

const initState = {
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    loading: true,
    user:null
};

export default function (state = initState, action) {
    switch (action.type) {
        case REQUEST_SUCCESS:
            localStorage.setItem('token',action.payload.token)
            return {
                ...state,
                ...payload,
                isAuthenticated: true,
                loading:false
            }
        case REQUEST_FAIL:
            localStorage.removeItem('token')
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading:true
            }
        default:
            return state

    }
}