import {
    REGISTER_SUCCESS,
    LOGIN_SUCCESS,
    USER_LOADED,
    LOGOUT_SUCCESS
}
from '../actions/types'

const initialState = {
    token:localStorage.getItem("token"),
    user:null,
    email:null,
    company_name:null,
    isAuthenticated:false,
    justregistered:false
}

export default function(state=initialState,action){
    switch(action.type){
        case LOGIN_SUCCESS:
            localStorage.setItem("token",action.payload.token)
            console.log(action.payload.user,998)
            return {
                ...state,
                ...action.payload.user,
                isAuthenticated:true,
                isLoading:false,
                justregistered:false
            }

        case REGISTER_SUCCESS:
            return {...state,
                    justregistered:true,
            }

        case USER_LOADED:
            console.log(action.payload,900)
            return {
                ...state,
                ...action.payload,
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