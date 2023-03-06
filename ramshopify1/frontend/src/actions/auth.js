import axios from 'axios'
import {LOGIN_SUCCESS,LOADING,LOADED,LOGOUT_SUCCESS,REGISTER_SUCCESS,PROFILE_UPDATED,PROFILE_RETRIEVED,USER_LOADED,TOKEN_RESENT,NEW_EMAIL_SET,TOKEN_VERIFIED,EMAIL_CHANGED} from "./types"
import {createMessage, returnErrors} from './message_error'

export const register=(company_name,password,email,address, phone_no, establishment)=>(dispatch)=>{
    const config={
        headers:{
            "Content-Type":"application/json"
        }
    }

    const body = JSON.stringify({company_name,password,email,address, phone_no, establishment})

    dispatch({
        type:LOADING
    })
    axios
        .post("api/auth/register",body,config)
        .then((res)=>{
            dispatch({
                type:REGISTER_SUCCESS,
                payload:res.data
            })
            dispatch({
                type:LOADED
            })
            dispatch(createMessage({msg:'Account Created Successfully!'}))
        })

        .catch((err) => {
            dispatch({
                type:LOADED
            })
            dispatch(returnErrors(err.response.data,err.response.status))
        })
}

export const getProfile =()=>(dispatch,getState)=>{
    const config={
        headers:{
            "Content-Type":"application/json"
        }
    }
    const token = getState().auth.token
    if(token) {
        config.headers["Authorization"] = `Token ${token}`
    }

    dispatch({
        type:LOADING
    })
    axios
        .get("api/auth/getProfile",config)
        .then((res)=>{
            dispatch({
                type:PROFILE_RETRIEVED,
                payload:res.data
            })
            dispatch({
                type:LOADED
            })
            dispatch(createMessage({msg:'Profile retrieved successfully!'}))
        })

        .catch((err) => {
            dispatch({
                type:LOADED
            })
            dispatch(returnErrors(err.response.data,err.response.status))
        })
}

export const updateProfile=(company_name,address, phone_no, establishment)=>(dispatch,getState)=>{
    const config={
        headers:{
            "Content-Type":"application/json"
        }
    }
    const token = getState().auth.token
    if(token) {
        config.headers["Authorization"] = `Token ${token}`
    }

    const body = JSON.stringify({company_name,address, phone_no, establishment})
    dispatch({
        type:LOADING
    })
    axios
        .post("api/auth/updateProfile",body,config)
        .then((res)=>{
            dispatch({
                type:PROFILE_UPDATED,
                payload:res.data
            })
            dispatch({
                type:LOADED
            })
            dispatch(createMessage({msg:'Profile updated Successfully!'}))
        })

        .catch((err) => {
            dispatch({
                type:LOADED
            })
            dispatch(returnErrors(err.response.data,err.response.status))
        })
}

export const login = (email, password) => (dispatch) => {
    const config = {
        headers :{
            "Content-Type" :"application/json"
        }
    }

    const body = JSON.stringify({email, password})

    dispatch({
        type:LOADING
    })
    axios
        .post("api/auth/login",body,config)
        .then((res)=>{
            dispatch({
                type:LOGIN_SUCCESS,
                payload:res.data
            })
            dispatch({
                type:LOADED
            })
            dispatch(createMessage({msg:'Login Successful'}))

        })

        .catch(
            (err) => {
                dispatch({
                    type:LOADED
                })
                dispatch(returnErrors(err.response.data,err.response.status))
            }
        )
}

export const loaduser = () => (dispatch,getState) => {

    const config = {
        headers:{"Content-Type":"application/json"}
    }
    const token = getState().auth.token

    if(token) {
        config.headers["Authorization"] = `Token ${token}`
    }

    axios
        .get("api/auth/user",config)
        .then((res)=>{
            dispatch({
                type:USER_LOADED,
                payload:res.data
            })
        })

        .catch((err) =>{
            console.log('user not authorised!!')
            dispatch({
                type:LOGOUT_SUCCESS
            })
        })
}

export const logout = () => (dispatch,getState) => {
    const config = {
        headers: {"Content-Type":"application/json"}
    }

    const token = getState().auth.token

    if(token){
        config.headers["Authorization"] = `Token ${token}`
    }

    axios
        .post("api/auth/logout",null,config)
        .then((res) => {
            dispatch({
                type:LOGOUT_SUCCESS,
            })

            dispatch(createMessage({msg:'Logout Successful'}))
        })

        .catch((err)=>{
            dispatch(returnErrors(err.response.data,err.response.status))
        })

}

export const verifytoken = (email,token)=>(dispatch)=>{
    const config={
        headers:{
            "Content-Type":"application/json"
        }
    }

    const body = JSON.stringify({email,token})
    axios
        .post('api/verifytoken',body,config)
        .then(()=>{
            dispatch({
                type:TOKEN_VERIFIED,
            })

            dispatch(createMessage({msg:'Token Verified'}))
        })

        .catch(
            (err) => {
                dispatch(returnErrors(err.response.data,err.response.status))
            }
        )
    
}

export const resend_token = (email)=>(dispatch)=>{

    const config={
        headers:{
            "Content-Type":"application/json"
        }
    }
    const body = JSON.stringify({email})
    
    axios
        .post('api/resendtoken',body,config)
        .then(()=>{
            dispatch({
                type:TOKEN_RESENT
            })

            dispatch(createMessage({msg:'Token Resent!'}))
        })

        .catch(
            (err) => {
                dispatch(returnErrors(err.response.data,err.response.status))
            }
        )
    
}


export const change_email = (old_email,new_email,password)=>(dispatch)=>{
    const config={
        headers:{
            "Content-Type":"application/json"
        }
    }

    const body = JSON.stringify({old_email,new_email,password}) //check axios format 
    axios
        .post('api/change_email',body,config)
        .then((res)=>{
            dispatch(createMessage({msg:'Email Set..Please Verify!'}))
            dispatch({
                type:NEW_EMAIL_SET,
                payload:res.data
            })
    
        })
        .catch(
            (err) => {
                dispatch(returnErrors(err.response.data,err.response.status))
            }
        )
    
}

export const email_token_change = (token) =>(dispatch)=>{//handles auth token passed to new email
    const config={
        headers:{
            "Content-Type":"application/json"
        }
    }

    config.headers["Authorization"] = `Token ${token}`
    const hname = window.location.origin
    axios
        .post( hname + '/api/token_change_email',null,config)
        .then((res)=>{
            dispatch({
                type:EMAIL_CHANGED,
                payload:res.data
            })
            dispatch(createMessage({msg:'New Email Verified!'}))
            axios
                .post(hname + '/api/auth/logoutall',null,config)
                .catch(
                    (err) => {
                        dispatch(returnErrors(err.response.data,err.response.status))
                    }
                )
        })
        
        .catch(
            (err) => {
                dispatch(returnErrors(err.response.data,err.response.status))
            }
        )
}

export const PasswordReset = (email)=>(dispatch)=>{

    const config={
        headers:{
            "Content-Type":"application/json"
        }
    }
    const body = JSON.stringify({email})
    
    axios
        .post('api/passwordResetLink',body,config)
        .then((res)=>{
            dispatch(createMessage({msg:'Token Resent!'}))
            return true    
        })
        .catch(
            (err) => {
                dispatch(returnErrors(err.response.data,err.response.status))
            }
        )
    
}