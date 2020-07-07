import {CREATE_PROFILE, PROFILE_ERROR} from '../actions/types'

const initState = {
    profile: {},
    profiles: [],
    loading: true,
    error:null
}

const profileReducer = (state = initState, action) => {
    const { payload, type } = action;
    
    switch(type){

        case CREATE_PROFILE:
            return {
                ...state,
                profile: payload,
                loading:false
            }
        case PROFILE_ERROR:
            return {
                ...state,
                error: payload,
                loading:false
            }
        default:
            return state
        
    }
    
}

export default profileReducer;