import {
    REGISTER_SUCCESS,
    LOGIN_SUCCESS,
    USER_LOADED,
    LOGOUT_SUCCESS,
    TOKEN_VERIFIED,
    NEW_EMAIL_SET,
    EMAIL_CHANGED
}
from '../actions/types'

const initialState = {
    token:localStorage.getItem("token"),
    user:{email:'',company_name:''},
    email:null,
    company_name:null,
    isAuthenticated:false,
    justregistered:false,
    justverified:false,
    "new_email_confirmed":{'status':'','new_email':false}
}

export default function(state=initialState,action){
    switch(action.type){
        case LOGIN_SUCCESS:
            localStorage.setItem("token",action.payload.token)
            console.log(action.payload.user,998)
            return {
                ...state,
                user:action.payload.user,
                isAuthenticated:true,
                isLoading:false,
                justregistered:false,
                token:localStorage.getItem("token") //check login ability after token expiry without havin to rfresh
                 
                
            }

        case REGISTER_SUCCESS:
            return{
                ...state,
                justregistered:true
            }
        case TOKEN_VERIFIED:
            return {
                    ...state,
                    justverified:true
                }

        case USER_LOADED:
            console.log(action.payload,900)
            return {
                ...state,
                user:action.payload,
                isAuthenticated:true,
                justregistered:false
            }

        case LOGOUT_SUCCESS:
            localStorage.removeItem("token")
            return {
                ...state,
                token:null,
                user:null,
                isAuthenticated:false,
                justregistered:false
            }


        default:
             return state
         };
         
}