import axios from "axios";
import {
  LOGIN_USER_LOADING,
  SIGNUP_USER_LOADING,
  SIGNUP_USER_FAIL,
  SIGNUP_USER_SUCCESS,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOCAL_HOST
} from "./types.js";



export const signupUser = ({ name, email, username, phone, password }) => {
  return dispatch => {
    return new Promise(function(resolve, reject) {
      dispatch({
        type: SIGNUP_USER_LOADING
      });
      if (
        name.length == 0 ||
        username.length == 0 ||
        email.length == 0 ||
        phone.length == 0 ||
        password.length == 0
        ){
          dispatch({
            type:SIGNUP_USER_FAIL
          });
          reject();
        }
        else {
          axios.post(`${LOCAL_HOST}/users`, {
            name,
            username,
            email,
            phone,
            password,
            followers:[],
            following:[],
            bio: '',
            avatar: ''
          }).then(response => {
            dispatch({
              type:SIGNUP_USER_SUCCESS,
              payload:{...response.data, followers:[], following: [], avatar: '', bio: ''}})
            resolve(response);
          });
        }
    });
  };
};

export const logoutUser = ()=> {
  return({
    type: LOGIN_USER_SUCCESS,
    payload: {
      name: "",
      email: "",
      username: "",
      phone: "",
      password: "",
      followers: [],
      following: []
    }
  });
};

export const loginUser = ({email, password}) => {
  return (dispatch) => {
    return new Promise(function (resolve, reject) {
        axios.get(`${LOCAL_HOST}/users?email=${email}&password=${password}`)
        .then((response)=>{
          dispatch({
            type: LOGIN_USER_LOADING
          });
          if(response.data.length == 0){
            dispatch({
              type:LOGIN_USER_FAIL
            });
            reject();
          }
          else {
            dispatch({
              type:LOGIN_USER_SUCCESS,
              payload: response.data[0]
            });
            resolve();
          }
        })    
    });
  };
};