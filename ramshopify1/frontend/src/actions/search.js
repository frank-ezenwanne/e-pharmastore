import axios from 'axios'
import {BRANDS_RETRIEVED} from './types'

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
