import {
    GET_ALBUME_OF_ID_LOADING,
    GET_ALBUME_OF_ID_SUCCESS,
    GET_ALBUME_OF_ID_FAIL
} from '../actions/types';

const INITIAL_STATE = {isLoading:false, albume: null , error:''}; 

export default (state = INITIAL_STATE, action)=>{
    switch(action.type){
        case GET_ALBUME_OF_ID_LOADING:
            return {...state, isLoading:true};
        case GET_ALBUME_OF_ID_SUCCESS:
            return {...state, isLoading:false, albume:action.payload};
        case GET_ALBUME_OF_ID_FAIL:
            return {...state, isLoading:false, error: action.payload};
        default: 
            return state;
    }
};