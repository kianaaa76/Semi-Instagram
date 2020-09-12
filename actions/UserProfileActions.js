import axios from "axios";
import {
  EDIT_PROFILE_LOADING,
  EDIT_PROFILE_SUCCESS,
  EDIT_PROFILE_FAIL,
  GET_AVATAR_URL,
  ADD_POST_FAIL,
  ADD_POST_LOADING,
  ADD_POST_SUCCESS,
  GET_POST_IMAGE,
  GET_ALBUME_IMAGE,
  DELETE_POST_FAIL,
  DELETE_POST_LOADING,
  DELETE_POST_SUCCESS,
  ADD_ALBUME_FAIL,
  ADD_ALBUME_SUCCESS,
  ADD_ALBUME_LOADING,
  ADD_PHOTO_FAIL,
  ADD_PHOTO_LOADING,
  ADD_PHOTO_SUCCESS,
  GET_ALBUME_PHOTO_IMAGE,
  LOCAL_HOST
} from "../actions/types";

export const editProfile = ({
  ID,
  name,
  email,
  username,
  password,
  phone,
  bio,
  avatar
}) => {
  //console.log("ID",ID);
  return dispatch => {
    return new Promise(async function(resolve, reject) {
      dispatch({
        type: EDIT_PROFILE_LOADING
      });
      try {
        await axios
          .patch(`${LOCAL_HOST}/users/${ID}`, {
            name: name,
            username: username,
            password: password,
            email: email,
            phone: phone,
            avatar: avatar,
            bio: bio
          })
          .then(Response => {
            console.log("Response.data",Response.data);
            if (Response.data) {
              dispatch({
                type: EDIT_PROFILE_SUCCESS,
                payload: Response.data
              });
              resolve();
            } else {
              dispatch({
                type: EDIT_PROFILE_FAIL,
                payload: "error"
              });
              reject();
            }
          });
      } catch (error) {
        dispatch({
          type: EDIT_PROFILE_FAIL,
          payload: error.message ? error.message : error
        });
        reject();
      }
    });
  };
};

export const ChangeAvatar = (uri, animate) => {
  return dispatch => {
    return new Promise(async function(resolve, reject) {
      try {
        animate();
        var body = new FormData();
        body.append("file", {
          uri: uri,
          type: "image/jpeg",
          name: "avatar.jpeg"
        });
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "https://panel.episodeapp.co/upload");
        xhr.onloadend = e => {
          var s = e.target._response;
          var obj = JSON.parse(s);
          dispatch({
            type: GET_AVATAR_URL,
            payload: obj.url
          });
          resolve();
        };
        xhr.send(body);
      } catch (error) {
        reject();
      }
    });
  };
};

export const addPost = ({ ID, title, body, image }) => {
  return dispatch => {
    return new Promise(function(resolve, reject) {
      dispatch({
        type: ADD_POST_LOADING
      });
      if (title.length == 0 || body.length == 0) {
        dispatch({
          type: ADD_POST_FAIL,
          payload: "Title or body can't be empty."
        });
        reject();
      } else {
        if (!image) {
          axios
            .post(`${LOCAL_HOST}/posts`, {
              title,
              body,
              userId: ID
            })
            .then(Response => {
              dispatch({
                type: ADD_POST_SUCCESS
              });
              resolve(Response);
            });
        } else {
          axios
            .post(`${LOCAL_HOST}/posts`, {
              title,
              body,
              image,
              userId: ID
            })
            .then(Response => {
              dispatch({
                type: ADD_POST_SUCCESS
              });
              resolve(Response);
            });
        }
      }
    });
  };
};

export const SetPostImage = (uri, animate) => {
  return dispatch => {
    return new Promise(function(resolve, reject) {
      try {
        animate();
        var body = new FormData();
        body.append("file", {
          uri: uri,
          type: "image/jpeg",
          name: "postImage.jpeg"
        });
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "https://panel.episodeapp.co/upload");
        xhr.onloadend = e => {
          var s = e.target._response;
          var obj = JSON.parse(s);
          dispatch({
            type: GET_POST_IMAGE,
            payload: obj.url
          });

          resolve();
        };
        xhr.send(body);
      } catch (error) {
        reject();
      }
    });
  };
};

export const DeletePost = (postId)=> {
  //console.log("postId",postId);
  return dispatch => {
    return new Promise (async function (resolve, reject){
      dispatch ({
        type: DELETE_POST_LOADING
      });
      try {
        await axios.delete(`${LOCAL_HOST}/posts/${postId}`).then ( () => {
          dispatch({
            type: DELETE_POST_SUCCESS
          });
          resolve();
        })
      } catch (error) {
        dispatch ({
          type: DELETE_POST_FAIL,
          payload: error
        });
        reject();
      }
    });
  }
}

export const addAlbume = ({userId, title, coverPhoto})=>{
  return dispatch=>{
    return new Promise (async function(resolve, reject){
      dispatch({
        type: ADD_ALBUME_LOADING
      });
      if (title.length==0){
        dispatch({
          type: ADD_ALBUME_FAIL,
          payload: 'Title Cant be Empty'
        });
        reject();
      }
      try{
        await axios.post(`${LOCAL_HOST}/albums`,{
          userId, title, coverPhoto
        }).then(res =>{
          dispatch({
            type: ADD_ALBUME_SUCCESS,
            payload: res.data
          });
          resolve();
        });
      } catch(error){
        dispatch({
          type: ADD_ALBUME_FAIL,
          payload: error
        });
        reject();
      }
    });
  };
}


export const SetAlbumeImage = (uri, animate) => {
  return dispatch => {
    return new Promise(function(resolve, reject) {
      try {
        animate();
        var body = new FormData();
        body.append("file", {
          uri: uri,
          type: "image/jpeg",
          name: "AlbumeCoverImage.jpeg"
        });
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "https://panel.episodeapp.co/upload");
        xhr.onloadend = e => {
          var s = e.target._response;
          var obj = JSON.parse(s);
          dispatch({
            type: GET_ALBUME_IMAGE,
            payload: obj.url
          });

          resolve();
        };
        xhr.send(body);
      } catch (error) {
        reject();
      }
    });
  };
};

export const addPhoto = ({url, albumId, title})=>{
  return dispatch=>{
      return new Promise (async function(resolve, reject){
          dispatch({
            type:ADD_PHOTO_LOADING
          });
          if (title.length==0){
            dispatch({
              type: ADD_PHOTO_FAIL,
              payload: 'Title Cant Be Empty.'
            });
            reject();
          }
          try{
              await axios.post(`${LOCAL_HOST}/photos`,{
                albumId, title , url
              }).then(res=>{
                dispatch({
                  type: ADD_PHOTO_SUCCESS,
                  payload: res.data
                });
                resolve();
              })
          } catch (error){
              dispatch({
                  type: ADD_PHOTO_FAIL,
                  payload: error
              });
              reject();
          }
      });
  };
};

export const SetAlbumePhotoImage = (uri) => {
  return dispatch => {
    return new Promise(function(resolve, reject) {
      try {
        var body = new FormData();
        body.append("file", {
          uri: uri,
          type: "image/jpeg",
          name: "AlbumePhotoImage.jpeg"
        });
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "https://panel.episodeapp.co/upload");
        xhr.onloadend = e => {
          var s = e.target._response;
          var obj = JSON.parse(s);
          dispatch({
            type: GET_ALBUME_PHOTO_IMAGE,
            payload: obj.url
          });

          resolve();
        };
        xhr.send(body);
      } catch (error) {
        reject();
      }
    });
  };
};