import axios from 'axios'
import {LOGIN_SUCCESS,LOGOUT_SUCCESS,REGISTER_SUCCESS,USER_LOADED,TOKEN_RESENT,NEW_EMAIL_SET,TOKEN_VERIFIED,EMAIL_CHANGED} from "./types"
import {createMessage, returnErrors} from './message_error'

export const register=(company_name,password,email)=>(dispatch)=>{
    const config={
        headers:{
            "Content-Type":"application/json"
        }
    }

    const body = JSON.stringify({company_name,password,email})

    axios
        .post("api/auth/register",body,config)
        .then((res)=>{
            dispatch({
                type:REGISTER_SUCCESS,
                payload:res.data
            });
        })

        .catch((err) => {
            console.log(err.response);
        })
}

export const login = (email, password) => (dispatch) => {
    const config = {
        headers :{
            "Content-Type" :"application/json"
        }
    }

    const body = JSON.stringify({email, password})

    axios
        .post("api/auth/login",body,config)
        .then((res)=>{
            console.log("logged in")
            dispatch({
                type:LOGIN_SUCCESS,
                payload:res.data
            })
            dispatch(createMessage('Login Successful'))

        })

        .catch(
            (err) => {
                console.log(err.response.data)
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
            console.log(res.data)
        })

        .catch((err) =>{
            console.log(err.response)
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
    })

    .catch((err)=>{
        console.log(err.response)
    })

}

export const verifytoken = (email,token)=>(dispatch)=>{
    console.log(email,token,890)
    const config={
        headers:{
            "Content-Type":"application/json"
        }
    }

    const body = JSON.stringify({email,token})
    axios
        .post('api/verifytoken',body,config)
        .then(()=>{
            console.log('verify token success')
            dispatch({
                type:TOKEN_VERIFIED,
            })
        })

        .catch(
            (err) => {
                console.log(err)
            }
        )
    
}

export const resend_token = (email)=>(dispatch)=>{

    const config={
        headers:{
            "Content-Type":"application/json"
        }
    }
    console.log(email,992)
    const body = JSON.stringify({email})
    
    axios
        .post('api/resendtoken',body,config)
        .then(()=>{
            console.log('resend token success')
            dispatch({
                type:TOKEN_RESENT
            })
        })

        .catch(
            (err) => {
                console.log(err)
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
            console.log('set email success')
            dispatch({
                type:NEW_EMAIL_SET,
                payload:res.data
            })
    
        })
        .catch(
            (err) => {
                console.log(err)
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
    console.log(hname,985)
    axios
        .post( hname + '/api/token_change_email',null,config)
        .then((res)=>{
            console.log('changed email success')
            dispatch({
                type:EMAIL_CHANGED,
                payload:res.data
            })
            axios
                .post(hname + '/api/auth/logoutall',null,config)
                .catch(
                    (err) => {
                        console.log(err)
                    }
                )
        })
        
        .catch(
            (err) => {
                console.log(err)
            }
        )
}

