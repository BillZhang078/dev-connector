import { REGISTER_SUCCESS, REGISTER_FAIL, LOADED_USER, LOADED_FAIL, LOGIN_FAIL, LOGIN_SUCCESS} from '../actions/types'

const initState = {
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    loading: true,
    user:null
};

export default function (state = initState, action) {

    const { type, payload } = action;
    
    switch (type) {
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            console.log('success')
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
                user: action.payload
            }
        case REGISTER_FAIL:
        case LOADED_FAIL:
        case LOGIN_FAIL:
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