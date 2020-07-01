import { REQUEST_SUCCESS, REQUEST_FAIL, LOADED_USER, LOADED_FAIL} from './types'

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
        case LOADED_USER:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: payload
            }
        case REQUEST_FAIL:
        case LOADED_FAIL:
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