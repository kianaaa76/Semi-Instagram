import {
  SIGNUP_USER_LOADING,
  LOGIN_USER_LOADING,
  SIGNUP_USER_FAIL,
  SIGNUP_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER_SUCCESS,
  UPDATE_FOLLOW,
  EDIT_PROFILE_LOADING,
  EDIT_PROFILE_SUCCESS,
  EDIT_PROFILE_FAIL,
  GET_AVATAR_URL
} from "../actions/types";

const INITIAL_STATE = {
  user : null,
  error:'',
  email: '',
  name: '',
  username: '',
  isLoading: false,
  phone: '',
  password: '',
  followers: [],
  following: [],
  bio:'',
  avatar: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SIGNUP_USER_LOADING:
      return { ...state, isLoading:true, error: ''};
    case SIGNUP_USER_FAIL: 
       return {...state, isLoading: false, error:'Authentication Failed.'}
    case SIGNUP_USER_SUCCESS: 
      return {...state,...INITIAL_STATE, user: action.payload}
    case LOGIN_USER_LOADING:
      return {...state, isLoading: false, error:''}
    case LOGIN_USER_FAIL: 
       return {...state, error:'Password Incorrect!', isLoading:false}
    case LOGIN_USER_SUCCESS:
       return{...state, ...INITIAL_STATE, user: action.payload}
    case UPDATE_FOLLOW:
       return {...state, user: action.payload};
    case EDIT_PROFILE_LOADING:
      return {...state, isLoading: true, error: ''}
    case EDIT_PROFILE_SUCCESS: 
      return {...state, 
        isLoading: false, 
        user: action.payload,
        error: ''
      }
    case EDIT_PROFILE_FAIL:
      return {...state, error: action.payload, isLoading:false}
    case GET_AVATAR_URL: 
      return {...state, avatar: action.payload};
    default:
      return state;
  }
};
