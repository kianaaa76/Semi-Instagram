import {GET_PHOTOS_OF_ALBUME} from '../actions/types';

const INITIAL_STATE = {
    photos:[]
};

export default (state=INITIAL_STATE, action)=>{
    switch (action.type) {
        case GET_PHOTOS_OF_ALBUME:
            return {...state, photos: action.payload};
        default: 
            return state;
    }
};