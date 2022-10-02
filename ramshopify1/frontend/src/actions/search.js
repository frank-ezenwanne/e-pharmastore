import axios from 'axios'
import {BRANDS_RETRIEVED} from './types'
import {ORDER_CREATED,CHANGE_CREATED_FALSE,LAST_ORDER_FETCHED,
    ORDER_PRODUCT_CREATED,ORDER_PRODUCT_CREATING,ORDER_PRODUCT_NOT_CREATED,
    GENERIC_PRODUCTS_RETRIEVED,CLEAR_GENERIC_PRODUCTS,ORDERS_RETRIEVED,
    ORDER_MADE_LAST,CLEAR_LAST_ORDER_AND_ID,CLEAR_BRAND_DESC,ORDER_PRODUCTS_DELETED,ORDER_DELETED,
    RESET_ORDER_DELETED_MOVE,ORDER_COPY_CREATED,GENERIC_NAMES_RETRIEVED,CLEAR_GENERIC_OPTIONS_INPUT,PREPARE_GENERIC_PRODUCTS
  
} from '../actions/types'
import {createMessage,returnErrors,email_error_handler,email_sent_handler} from './message_error'

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

export const send_orderproduct = (product_id,
    selected_unit,cost,raw_cost,quantity_ordered,
    full_pack_quantity,unit_quantity,total,extra_info,
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

        const body = {product_id,
            selected_unit,cost,raw_cost,quantity_ordered,
            full_pack_quantity,unit_quantity,total,extra_info,
            serial,order_id}

        axios
        .post("api/post_orderproduct",body,config)
        .then((res)=>{
       
            dispatch({
                type:ORDER_PRODUCT_CREATED,
                payload:{   data:res.data, serial: { [serial]:false } }
            })  
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




export const search_brand = (brand_description,radio_option,serial) => (dispatch) =>{
    const config={
        headers:{
            "Content-Type":"application/json"
        }
    }

    const body = JSON.stringify({brand_description,radio_option,serial})

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

export const search_generic_names = (generic_name) => (dispatch,getState) =>{
    const config={
        headers:{
            "Content-Type":"application/json"
        }
    }

    const token = getState().auth.token
    if(token){
        config.headers['Authorization'] = `Token ${token}`
    }

    const body = JSON.stringify({generic_name})

    axios
    .post("api/get_generic_options",body,config)
    .then((res)=>{
        console.log("retrieved")
        dispatch({
            type:GENERIC_NAMES_RETRIEVED,
            payload:res.data
        })
    })

    .catch(
        (err) => {
            console.log(err.response)
        }
    )
}

export const get_customer_orders = () => (dispatch,getState) =>{
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
    .get("api/get_customer_orders",config)
    .then((res)=>{
        console.log("orders retrieved")
        dispatch({
            type:ORDERS_RETRIEVED,
            payload:res.data
        })
    })

    .catch(
        (err) => {
            console.log(err.response)
        }
    )
}

//get selected order
export const get_selected_order = (id) => (dispatch,getState) =>{
    const config={
        headers:{
            "Content-Type":"application/json"
        }
    }

    const token = getState().auth.token

    if(token) {
        config.headers["Authorization"] = `Token ${token}`
    }

    const body = JSON.stringify({id})

    axios
    .post("api/get_selected_order",body,config)
    .then((res)=>{
        console.log("selected order made lt")
        dispatch({
            type:ORDER_MADE_LAST,
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
            payload:{data:res.data,generic_name_prop:generic_name}
        })
    })

    .catch(
        (err) => {
            console.log(err.response)
        }
    )


}

export const delOrderProducts = (order_id,del_list) => (dispatch,getState) =>{
    const config={
        headers:{
            "Content-Type":"application/json"
        }
    }
    const token = getState().auth.token

    if(token) {
        config.headers["Authorization"] = `Token ${token}`
    }

    const body = JSON.stringify({order_id,del_list})
    axios
    .post("api/delete_orderproduct",body,config)
    .then((res)=>{
        console.log("deleted_items")
        dispatch({
            type:ORDER_PRODUCTS_DELETED,
            payload:res.data
        })
    })

    .catch(
        (err) => {
            console.log(err.response)
        }
    )

}

export const delete_order = (id) => (dispatch,getState) =>{
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
    .delete("api/delete_order",{headers:{"Authorization" : `Token ${token}`},data:{'id':id}})
    .then((res)=>{
        console.log("deleted_items")
        dispatch({
            type:ORDER_DELETED,
            payload:res.data
        })
    })

    .catch(
        (err) => {
            console.log(err.response)
        }
    )

}


export const send_email = (id) => (dispatch,getState) =>{
    const config={
        headers:{
            "Content-Type":"application/json"
        }
    }
    const token = getState().auth.token

    if(token) {
        config.headers["Authorization"] = `Token ${token}`
    }

    const body = JSON.stringify({id})
    axios
    .post("api/SendCSVEmail",body,config)
    
    .then((res)=>{
        dispatch(createMessage(res.data))
        dispatch(email_sent_handler())
    })

    .catch(
        (err) => {
            dispatch(email_error_handler(err.response.data,err.response.status))
        }
    )

}

export const copy_order = (id) => (dispatch,getState) =>{
    const config={
        headers:{
            "Content-Type":"application/json"
        }
    }
    const token = getState().auth.token

    if(token) {
        config.headers["Authorization"] = `Token ${token}`
    }

    const body = JSON.stringify({id})
    axios
    .post("api/CreateOrderWithTemplate",body,config)
    
    .then((res)=>{
        console.log("successfully created copy order")
        dispatch({
            type:ORDER_COPY_CREATED,
        })
        dispatch(createMessage(res.data))
    })

    .catch(
        (err) => {
            console.log(err)
        }
    )

}






export const prepareGenericProducts = (order_prods)=>(dispatch)=>{
    dispatch({
        type:PREPARE_GENERIC_PRODUCTS,
        payload:order_prods
    })
}


export const clear_gen_products = ()=>(dispatch)=>{
    dispatch({
        type:CLEAR_GENERIC_PRODUCTS,
    })
}
export const clear_gen_options_input = ()=>(dispatch)=>{
    dispatch({
        type:CLEAR_GENERIC_OPTIONS_INPUT,
    })
}

export const clear_brand_desc = ()=>(dispatch) =>{
    dispatch({
        type:CLEAR_BRAND_DESC
    })
}

export const clear_loiId = () =>(dispatch)=>{
    dispatch({
        type:CLEAR_LAST_ORDER_AND_ID
    })
}

export const clear_order_deleted_stat = () =>(dispatch)=>{
    dispatch({
        type:RESET_ORDER_DELETED_MOVE
    })
}


