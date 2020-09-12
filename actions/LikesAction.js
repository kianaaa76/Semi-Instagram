import axios from 'axios';
import {
    LOCAL_HOST,
    LIKE_POST_SUCCESS,
    UNLIKE_POST_SUCCESS
} from '../actions/types';

export const LikePost = (postId, likerId) => {
    return dispatch => {
        return new Promise (async function (resolve, reject) {
            try{
                var {data} = await axios.get(`${LOCAL_HOST}/posts?id=${postId}`);
                let res = {};
                if(data[0].likers && data[0].likers.length>0){
                    if(!data[0].likers.includes(likerId)){
                    const hasBeenLiked = data[0].likers;
                    res = await axios.patch(`${LOCAL_HOST}/posts/${postId}`,
                        {likers : [...hasBeenLiked, likerId]}
                    );
                }} else {
                    res = await axios.patch(`${LOCAL_HOST}/posts/${postId}`,
                        {likers : [likerId]}
                    );
                }
                dispatch({
                    type: LIKE_POST_SUCCESS,
                    payload: res.data
                });
                resolve();
            } catch(error){
                reject(error);
            };
        });
    };
};

export const UnlikePost= (postId, userId) => {
    return dispatch => {
        return new Promise(async function(resolve, reject){
            try{
                var {data} = await axios.get(`${LOCAL_HOST}/posts?id=${postId}`);
                const likeData = data[0].likers;
                for (let i=0; i<likeData.length; i++){
                    if (likeData[i]== userId){
                        likeData.splice(i,1);
                        i = i-1;
                    }
                }
                let res = await axios.patch(`${LOCAL_HOST}/posts/${postId}`,
                    {likers : [...likeData] }
                )
                dispatch({
                    type: UNLIKE_POST_SUCCESS,
                    payload: res.data
                });
                resolve();
            } catch(error){
                reject(error);
            }
        });
    }
}