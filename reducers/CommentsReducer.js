import {
    GET_COMMENTS_LOADING,
    GET_COMMENTS_FAIL,
    GET_COMMENTS_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {
    comments:[],
    isLoading: false,
    error: ''
};

export default (state=INITIAL_STATE, action)=>{
    switch(action.type){
        case GET_COMMENTS_LOADING:
            return {...state, isLoading: true};
        case GET_COMMENTS_SUCCESS:
            return {...state, comments:action.payload, isLoading:false};
        case GET_COMMENTS_FAIL:
            return {...state, isLoading:false, error: action.payload};
        default:
            return state;
    }
};