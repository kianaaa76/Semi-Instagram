import {
    GET_ALBUMES_OF_USER,
    GET_POSTS_OF_USER, 
} from '../actions/types';

const INITIAL_STATE = {
    ProfileAlbume:[],
    ProfilePost:[],
};

export default (state=INITIAL_STATE, action)=>{
    switch(action.type){
        case GET_ALBUMES_OF_USER:
            return {...state, ProfileAlbume: action.payload};
        case GET_POSTS_OF_USER:
            return {...state, ProfilePost: action.payload};
        default: 
            return state;
    }
};