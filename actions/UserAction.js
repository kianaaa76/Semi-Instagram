import axios from 'axios';
import {
    GET_USERS, LOCAL_HOST
} from './types';

export const getUsers = () => {
    return (dispatch) => {
        return new Promise(function (resolve) {
            axios.get(`${LOCAL_HOST}/users`)
            .then((response) => {
                dispatch({ 
                    type: GET_USERS ,
                    payload: response.data
                });
                resolve(response.data);
            })
        });
    }
};

