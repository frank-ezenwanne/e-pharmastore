import {
    REGISTER_SUCCESS,
    LOGIN_SUCCESS,
    USER_LOADED,
    LOADING,
    LOADED,
    LOGOUT_SUCCESS,
    TOKEN_VERIFIED,
    NEW_EMAIL_SET,
    EMAIL_CHANGED,
    TOKEN_RESENT,
}
from '../actions/types'

const initialState = {
    token:localStorage.getItem("token"),
    user:{email:'',company_name:''},
    isAuthenticated:false,
    justregistered:false,
    justverified:false,
    new_email_confirmed:{'status':false,'new_email':false},
    user_active:'not_logged_in',
    token_resent:false,
    new_email_set:false,
    isLoading:false
}

export default function(state=initialState,action){
    switch(action.type){
        case LOGIN_SUCCESS:
            localStorage.setItem("token",action.payload.token)
            let user_active
            let isAuthenticated 
            if(action.payload.token){
                localStorage.setItem("token",action.payload.token)
                user_active = true
                isAuthenticated = true
            }
            else{
                user_active = false
                isAuthenticated = false
            }
            return {
                ...state,
                user_active:user_active,
                user:action.payload.user,
                isAuthenticated:isAuthenticated,
                isLoading:false,
                justregistered:false,
                token:localStorage.getItem("token") //check login ability after token expiry without havin to rfresh
                
            }

        case LOADING:
            return{
                ...state,
                isLoading:true
            }
        
        case LOADED:
                return{
                    ...state,
                    isLoading:false
                }

        case REGISTER_SUCCESS:
            return{
                ...state,
                justregistered:true,
                user:action.payload.user
            }
        case TOKEN_VERIFIED:
            return {
                    ...state,
                    justverified:true,
                    user_active:'not_logged_in'
                }

        case TOKEN_RESENT:
                return{
                    ...state,
                    token_resent:true
                }

        case NEW_EMAIL_SET:
            return{
                ...state,
                ...action.payload,
                new_email_set:true
            }
        case EMAIL_CHANGED:
            return{
                ...state,
                ...action.payload
            }

        case USER_LOADED:
            return {
                ...state,
                user_active:true,
                user:action.payload,
                isAuthenticated:true,
                justregistered:false
            }

        case LOGOUT_SUCCESS:
            localStorage.removeItem("token")
            return {
                ...state,
                user_active:'not_logged_in',
                token:null,
                user:{email:'',company_name:''},
                isAuthenticated:false,
                justregistered:false
            }


        default:
             return state
         };
         
}