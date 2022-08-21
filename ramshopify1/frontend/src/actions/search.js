import axios from 'axios'
import {BRANDS_RETRIEVED} from './types'
import {ORDER_CREATED,CHANGE_CREATED_FALSE,LAST_ORDER_FETCHED,
    ORDER_PRODUCT_CREATED
} from '../actions/types'


export const create_order = () => (dispatch,getState) =>{
    const config={
        headers:{
            "Content-Type":"application/json"
        }
    }
    const token = getState().auth.token

    if(token) {
        config.headers["Authorization"] = `Token ${token}`
    }

    axios
    .post("api/create_order",null,config)
    .then((res)=>{
        dispatch({
            type:ORDER_CREATED,
            payload:res.data
        })
        
    })

    .catch((err) =>{
        console.log(err.response)
    })
}

export const send_orderproduct = (product_id,generic_name,
    brand_description,
    presentation,cost,quantity_ordered,
    full_pack_quantity,unit_quantity,
    serial,order_id) => (dispatch,getState) =>
    {
        const config={
            headers:{
                "Content-Type":"application/json"
            }
        }
        const token = getState().auth.token
        if(token) {
            config.headers["Authorization"] = `Token ${token}`
        }

        const body = {product_id,generic_name,
            brand_description,
            presentation,cost,quantity_ordered,
            full_pack_quantity,unit_quantity,
            serial,order_id}

        axios
        .post("api/post_orderproduct",body,config)
        .then((res)=>{
            dispatch({
                type:ORDER_PRODUCT_CREATED,
                payload:res.data
            })
            
        })
    
        .catch((err) =>{
            console.log(err.response)
        })

}





export const get_last_order = () => (dispatch,getState) =>{
    const config={
        headers:{
            "Content-Type":"application/json"
        }
    }
    const token = getState().auth.token

    if(token) {
        config.headers["Authorization"] = `Token ${token}`
    }

    axios
    .get("api/get_last_order",config)
    .then((res)=>{
       
        dispatch({
            type:LAST_ORDER_FETCHED,
            payload:res.data
        })
        
    })

    .catch((err) =>{
        console.log(err.response)
    })

}




export const change_created_status = () => (dispatch)=>{
        dispatch({
            type:CHANGE_CREATED_FALSE
        })  

}



export const search_brand = (brand_description,serial) => (dispatch) =>{
    const config={
        headers:{
            "Content-Type":"application/json"
        }
    }

    const body = JSON.stringify({brand_description,serial})
    console.log(body)

    axios
    .post("api/get_brand_options",body,config)
    .then((res)=>{
        console.log("retrieved")
        dispatch({
            type:BRANDS_RETRIEVED,
            payload:res.data
        })
    })

    .catch(
        (err) => {
            console.log(err.response)
        }
    )
}


