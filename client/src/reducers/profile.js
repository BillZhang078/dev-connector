import {
  CREATE_PROFILE,
  PROFILE_ERROR,
  CLEAR_PROFILE,
  POST_PROFILE,
  EDIT_EDUCATION,
  EDIT_EXPERIENCE,
  DELETE_EXPERIENCE,
} from '../actions/types';

const initState = {
  profile: null,
  profiles: [],
  loading: true,
  error: null,
};

const profileReducer = (state = initState, action) => {
  const { payload, type } = action;

  switch (type) {
    case CREATE_PROFILE:
    case POST_PROFILE:
    case EDIT_EXPERIENCE:
    case EDIT_EDUCATION:
    case DELETE_EXPERIENCE:
      return {
        ...state,
        profile: payload,
        loading: false,
      };
    case PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
      };
    default:
      return state;
  }
};

export default profileReducer;
