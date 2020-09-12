import axios from 'axios';
import {
    GET_POSTS_OF_USER,
    GET_ALBUMES_OF_USER,
    GET_ALBUMES_OF_CURRENT_USER,
    GET_POSTS_OF_CURRENT_USER,
    GET_PHOTOS_OF_ALBUME,
    UPDATE_FOLLOW,
    GET_ALBUME_OF_ID_SUCCESS,
    GET_ALBUME_OF_ID_FAIL,
    GET_ALBUME_OF_ID_LOADING,
    LOCAL_HOST
} from './types';

export const getPostsOfUser =(userId)=>{
    //console.log("userId", userId);
    return (dispatch) => {
        return new Promise(function (resolve) {
            axios.get(`${LOCAL_HOST}/posts?userId=${userId}`)
            .then((response)=>{
                dispatch({
                    type: GET_POSTS_OF_USER,
                    payload: response.data
                });
                resolve(response);
            })    
        });
    };
};

export const getAlbumsOfUser = (userId) => {
    return (dispatch) => {
        return new Promise(function (resolve) {
            axios.get(`${LOCAL_HOST}/albums?userId=${userId}`)
            .then((response)=>{
                dispatch({
                    type: GET_ALBUMES_OF_USER,
                    payload: response.data
                });
                resolve(response);
            })    
        });
    };
};

export const getPostsOfCurrentUser =(userId)=>{
    return (dispatch) => {
        return new Promise(function (resolve) {
            axios.get(`${LOCAL_HOST}/posts?userId=${userId}`)
            .then((response)=>{
                dispatch({
                    type: GET_POSTS_OF_CURRENT_USER,
                    payload: response.data
                });
                resolve(response);
            })    
        });
    };
};

export const getAlbumsOfCurrentUser = (userId) => {
    return (dispatch) => {
        return new Promise(function (resolve) {
            axios.get(`${LOCAL_HOST}/albums?userId=${userId}`)
            .then((response)=>{
                dispatch({
                    type: GET_ALBUMES_OF_CURRENT_USER,
                    payload: response.data
                });
                resolve(response);
            })    
        });
    };
};

export const getPhotosOfAlbume = (albumId) => {
    return (dispatch) => {
        return new Promise(function (resolve) {
            axios.get(`${LOCAL_HOST}/photos?albumId=${albumId}`)
            .then((response)=>{
                dispatch({
                    type: GET_PHOTOS_OF_ALBUME,
                    payload: response.data
                });
                resolve(response);
            })    
        });
    };
};

export const followUser = (followerId, followeeId)=> {
    return dispatch => {
        return new Promise(async function(resolve, reject) {
            try {
                var {data} = await axios.get(`${LOCAL_HOST}/users?id=${followerId}`);
                const followerData = data[0].following;
                
                var {data} = await axios.get(`${LOCAL_HOST}/users?id=${followeeId}`);
                const followeeData = data[0].followers;

                await axios.patch(`${LOCAL_HOST}/users/${followeeId}`,
                    {followers : [...followeeData, followerId]}
                );

                let res = await axios.patch(`${LOCAL_HOST}/users/${followerId}`,
                    {following : [...followerData, followeeId]}
                );

                dispatch({
                    type: UPDATE_FOLLOW,
                    payload: res.data
                });

                resolve();
            } catch (error) {
                reject();
            }
        });
    };
};

export const getAlbumeOfId = (id)=>{
    return dispatch => {
        dispatch({
            type: GET_ALBUME_OF_ID_LOADING
        });
        return new Promise (function(resolve, reject){
            try{
            axios.get(`${LOCAL_HOST}/albums?id=${id}`).then(res=>{
                dispatch({
                    type:GET_ALBUME_OF_ID_SUCCESS,
                    payload: res.data
                });
                resolve(res);
            });
            } catch (error) {
                dispatch({
                    type: GET_ALBUME_OF_ID_FAIL,
                    payload: error
                });
                reject();
            }
        });
    }
};