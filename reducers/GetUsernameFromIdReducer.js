import {GET_USERNAME_FROM_ID} from '../actions/types';

const INITIAL_STATE={};

export default (state=INITIAL_STATE, action)=>{
    switch(action.type){
        case GET_USERNAME_FROM_ID:
            return action.payload;
        default:
            return state;
    }
};