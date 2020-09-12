import {
    DELETE_POST_LOADING,
    DELETE_POST_SUCCESS,
    DELETE_POST_FAIL
} from '../actions/types';

const INIITIAL_STATE = {isLoading: false, error:''};

export default (state = INIITIAL_STATE, action) => {
    switch(action.type){
        case DELETE_POST_LOADING:
            return {...state, isLoading:true};
        case DELETE_POST_FAIL: 
            return {...state, isLoading:false, error: action.payload};
        case DELETE_POST_SUCCESS:
            return {...state, isLoading: false, error: ''};
        default:
            return state;
    }
};