import {
    ADD_POST_LOADING,
    ADD_POST_SUCCESS,
    ADD_POST_FAIL
} from '../actions/types';

const INITIAL_STATE = {isLoading: false, error: ''};

export default (state = INITIAL_STATE, action) => {
    switch (action.type){
        case ADD_POST_LOADING: 
            return {isLoading: true, error:''};
        case ADD_POST_FAIL:
            return {isLoading: false, error: action.payload};
        case ADD_POST_SUCCESS: 
            return {isLoading: false, error:''};
        default: 
            return state;
    }
};