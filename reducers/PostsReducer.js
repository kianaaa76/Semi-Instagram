import {
  GET_POSTS_OF_FOLLOWING_LOADING,
  GET_POSTS_OF_FOLLOWING_SUCCESS,
  GET_POSTS_OF_FOLLOWING_FAIL,
  GET_POSTS_SUCCESS,
  GET_POSTS_FAIL,
  GET_POSTS_LOADING
} from "../actions/types";

const INITIAL_STATE = {
  posts: [],
  postsOfFollowing: [],
  loading: false,
  error: ""
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_POSTS_LOADING:
      return {...state, loading: true, error: ""};
    case GET_POSTS_FAIL:
      return {...state, loading: false, error: action.payload};
    case GET_POSTS_SUCCESS:
      return { ...state, loading: false, error:"",  posts: action.payload };
    case GET_POSTS_OF_FOLLOWING_LOADING:
      return { ...state, loading: true, error: "" };
    case GET_POSTS_OF_FOLLOWING_SUCCESS:
      return {
        ...state,
        loading: false,
        postsOfFollowing: action.payload,
        error: ""
      };
    case GET_POSTS_OF_FOLLOWING_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
