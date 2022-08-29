import axios from 'axios'
import {LOGIN_SUCCESS,LOGOUT_SUCCESS,REGISTER_SUCCESS,USER_LOADED} from "./types"


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
        })

        .catch(
            (err) => {
                console.log(err.response)
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

