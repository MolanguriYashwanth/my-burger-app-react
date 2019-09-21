import * as actionTypes from "./actions";
import axios from "axios";

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (authData,username) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        authData: authData,
        username:username
    }
}

export const authFailed = (error) => {
    return {
        type: actionTypes.AUTH_FAILED,
        error: error
    }
}


export const auth = (email,password,isSignUp) => {
    return dispatch => {
        dispatch(authStart());
        const authData ={
            "password":password, 
            "username":email}
        let url = 'http://localhost:8085/authentication/login';
        console.log('isSignUp',isSignUp);
        if(isSignUp){
            axios.post(url,authData).then((response) => {
                console.log('authResponse',response);
                dispatch(authSuccess(response.data,response.data.config.data.username))
            }).catch((err) => {
                console.log('authFailed',err)
                dispatch(authFailed(err))
            })
        }    
    }
}