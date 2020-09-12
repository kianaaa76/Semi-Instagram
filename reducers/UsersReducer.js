import {
    GET_USERS
} from '../actions/types';

const INITIAL_STATE = {};

export default (state= INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_USERS:
            return action.payload;
        default:
            return state;
    }
};