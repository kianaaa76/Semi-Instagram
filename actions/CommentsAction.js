import axios from "axios";
import { 
  GET_COMMENTS_SUCCESS,
  GET_COMMENTS_FAIL ,
  GET_COMMENTS_LOADING,
  LOCAL_HOST, 
  POST_COMMENT 
} from "./types";

export const getComments = postId => {
  return dispatch => {
    return new Promise(function(resolve, reject) {
      dispatch({
        type: GET_COMMENTS_LOADING
      });
      try{
      axios.get(`${LOCAL_HOST}/comments?postId=${postId}`).then(async response => {
        let commentsWithUser = await Promise.all(
          response.data.map(async comment => {
            const res = await axios.get(
              `${LOCAL_HOST}/users?id=${comment.userId}`
            );
            return { ...comment, user: res.data[0] };
          })
        );
        dispatch({
          type: GET_COMMENTS_SUCCESS,
          payload: commentsWithUser
        });
        resolve();
      });
    } catch (error)
    {
      dispatch({
        type: GET_COMMENTS_FAIL,
        payload: error
      });
    }
    });
  };
};

export const PostComment = (body, userId, postId, email, avatar) => {
  return dispatch => {
    return new Promise(async function(resolve, reject) {
      console.warn("PostComment Call");
      if (body.length == 0) {
        reject();
      } else {
        axios
          .post(`${LOCAL_HOST}/comments`, {
            body,
            userId,
            postId,
            email,
            userAvatar: avatar
          })
          .then(response => {
            console.warn("PostComment getRes");

            dispatch({
              type: POST_COMMENT
            });
            resolve(response);
          });
      }
    });
  };
};
