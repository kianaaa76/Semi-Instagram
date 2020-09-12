import axios from "axios";
import {
  GET_POSTS_SUCCESS,
  GET_POSTS_FAIL,
  GET_POSTS_LOADING,
  GET_USERNAME_FROM_ID,
  GET_POSTS_OF_FOLLOWING_LOADING,
  GET_POSTS_OF_FOLLOWING_SUCCESS,
  GET_POSTS_OF_FOLLOWING_FAIL,
  LOCAL_HOST
} from "./types";

export const getPosts = () => {
  return dispatch => {
    return new Promise(function(resolve,reject) {
      dispatch({
        type: GET_POSTS_LOADING
      })
      try{
      axios.get(`${LOCAL_HOST}/posts`).then(async response => {
        let postWithUser = await Promise.all(
          response.data.map(async post => {
            const res = await axios.get(
              `${LOCAL_HOST}/users?id=${post.userId}`
            );
            return { ...post, user: res.data[0] };
          })
        );
        dispatch({
          type: GET_POSTS_SUCCESS,
          payload: postWithUser
        });
        resolve();
      });
    } catch(error){
      dispatch({
        type: GET_POSTS_FAIL,
        payload: error
      });
      reject();
    }
    });
  };
};

export const getUsernameFromId = userId => {
  return dispatch => {
    return new Promise(function(resolve) {
      axios.get(`${LOCAL_HOST}/users?id=${userId}`).then(response => {
        dispatch({
          type: GET_USERNAME_FROM_ID,
          payload: response.data[0]
        });
        resolve(response);
      });
    });
  };
};

export const getPostsOfFollowings = userId => {
  // console.log('userID', userId);
  return dispatch => {
    return new Promise(async function(resolve, reject) {
      dispatch({
        type: GET_POSTS_OF_FOLLOWING_LOADING
      });
      try {
        //console.log("hey");
        axios
          .get(`${LOCAL_HOST}/users?id=${userId}`)
          .then(async response => {
          
            let posts = [];
            //console.log("res", response.data);
            for (let i = 0; i < response.data[0].following.length; i++) {
              await axios.get(
                  `${LOCAL_HOST}/posts?userId=${
                    response.data[0].following[i]
                  }`
                )
                .then(
                  async response => {
                    let postWithUser = await Promise.all(
                      response.data.map(async post => {
                        const res = await axios.get(
                          `${LOCAL_HOST}/users?id=${post.userId}`
                        );
                        return { ...post, user: res.data[0] };
                      })
                    );
                    
                    posts =[...posts,...postWithUser]
                  }
                )
            }
           
            dispatch({
              type: GET_POSTS_OF_FOLLOWING_SUCCESS,
              payload: posts
            });
            resolve();
          });
      } catch (error) {
        dispatch({
          type: GET_POSTS_OF_FOLLOWING_FAIL,
          payload: error
        });
        reject();
      }
    });
  };
};


