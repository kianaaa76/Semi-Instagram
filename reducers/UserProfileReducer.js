import {
    GET_POSTS_OF_CURRENT_USER,
    GET_ALBUMES_OF_CURRENT_USER
} from '../actions/types';

const INITIAL_STATE = {
    UserProfilePosts: [],
    UserProfileAlbums: []
};

export default (state = INITIAL_STATE, action)=>{
    switch (action.type){
        case GET_POSTS_OF_CURRENT_USER:
            return {...state, UserProfilePosts: action.payload};
        case GET_ALBUMES_OF_CURRENT_USER:
            return {...state, UserProfileAlbums: action.payload};
        default:
            return state;
    }
};