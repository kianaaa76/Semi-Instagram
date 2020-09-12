import {
    ADD_PHOTO_LOADING,
    ADD_PHOTO_SUCCESS,
    ADD_PHOTO_FAIL
} from '../actions/types';

const INITIAL_STATE = { photo: null, isLoading: false, error:''};

export default (state= INITIAL_STATE, action)=>{
    switch (action.type){
        case ADD_PHOTO_LOADING:
            return {...state, isLoading: true};
        case ADD_PHOTO_FAIL:
            return {...state, isLoading: false, error: action.payload};
        case ADD_PHOTO_SUCCESS:
            return {...state, error: '', isLoading: false, photo: action.payload};
        default: 
            return state;
    }
};
