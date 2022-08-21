import {BRANDS_RETRIEVED} from '../actions/types'
import {ORDER_CREATED,CHANGE_CREATED_FALSE,
    LAST_ORDER_FETCHED,
    ORDER_PRODUCT_CREATED
} from '../actions/types'


const initialState = {
    products:"",
    generics:"",
    order_id:null,
    just_created:false,
    last_orderid:null,
    loi:null
}

export default function (state = initialState,action){
    switch(action.type){
        case BRANDS_RETRIEVED:
            return {
                ...state,
                ...action.payload
            }

        case ORDER_CREATED:
            return {
                ...state,
                just_created:true,
               ...action.payload
            }

        case CHANGE_CREATED_FALSE:
            return {
                ...state,
                just_created:false
            }

        case LAST_ORDER_FETCHED:
            return {
                ...state,
                ...action.payload,
                
            }

        case ORDER_PRODUCT_CREATED:
            return{
                ...state,
                ...action.payload
            }

        

        default:
            return state
    }
}
