import axios from 'axios'
import {BRANDS_RETRIEVED} from './types'
import {ORDER_CREATED,CHANGE_CREATED_FALSE,LAST_ORDER_FETCHED,
    ORDER_PRODUCT_CREATED,ORDER_PRODUCT_CREATING,ORDER_PRODUCT_NOT_CREATED,GENERIC_PRODUCTS_RETRIEVED
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
    selected_unit,cost,raw_cost,quantity_ordered,
    full_pack_quantity,unit_quantity,total,
    serial,order_id) => (dispatch,getState) =>
    {
        dispatch({
            type:ORDER_PRODUCT_CREATING,
            payload:{[serial]:true}
        })
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
            selected_unit,cost,raw_cost,quantity_ordered,
            full_pack_quantity,unit_quantity,total,
            serial,order_id}

        axios
        .post("api/post_orderproduct",body,config)
        .then((res)=>{
       
            dispatch({
                type:ORDER_PRODUCT_CREATED,
                payload:{   data:res.data, serial: { [serial]:false }
            }})  
        })
    
        .catch((err) =>{
            console.log(err.response)
            dispatch({
                type:ORDER_PRODUCT_NOT_CREATED,
                payload:{[serial]:"error"}
            })
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


export const getGenProducts = (generic_name) => (dispatch) =>{
    const config={
        headers:{
            "Content-Type":"application/json"
        }
    }

    const body = JSON.stringify({generic_name})

    axios
    .post("api/get_generic_products",body,config)
    .then((res)=>{
        console.log("retrieved")
        dispatch({
            type:GENERIC_PRODUCTS_RETRIEVED,
            payload:res.data
        })
    })

    .catch(
        (err) => {
            console.log(err.response)
        }
    )


}

