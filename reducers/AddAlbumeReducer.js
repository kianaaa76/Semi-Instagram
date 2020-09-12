import {
    ADD_ALBUME_FAIL,
    ADD_ALBUME_SUCCESS,
    ADD_ALBUME_LOADING
} from '../actions/types';

const INITIAL_STATE = {error:'', isLoading: false};

export default (state=INITIAL_STATE, action)=>{
    switch(action.type){
        case ADD_ALBUME_LOADING:
            return {...state, isLoading:true, error:''};
        case ADD_ALBUME_SUCCESS:
            return {...state, isLoading: false, error:''};
        case ADD_ALBUME_FAIL: 
            return {...state, isLoading: false, error:action.payload};
        default:
            return state;
    }
}
