import {BRANDS_RETRIEVED} from '../actions/types'
import {ORDER_CREATED,CHANGE_CREATED_FALSE,
    LAST_ORDER_FETCHED,
    ORDER_PRODUCT_CREATED,ORDER_PRODUCT_CREATING,ORDER_PRODUCT_NOT_CREATED,GENERIC_PRODUCTS_RETRIEVED
} from '../actions/types'


const initialState = {
    products:"",
    generics:"",
    order_id:null,
    just_created:false,
    last_orderid:null,
    loi:{},
    orderCreating:false,
    loading_serials:{},
    generic_products: {}
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

        case ORDER_PRODUCT_CREATING:
            return{
                ...state,
                orderCreating:true,
                loading_serials:{...state.loading_serials,...action.payload},
                products:{}
            }

        case ORDER_PRODUCT_CREATED:
            return{
                ...state,
                ...action.payload.data,
                loading_serials:{...state.loading_serials,...action.payload.serial}
            }

        case ORDER_PRODUCT_NOT_CREATED:
            return {
                ...state,
                loading_serials:{...state.loading_serials,...action.payload}
            }

        case GENERIC_PRODUCTS_RETRIEVED:
            
            return {
                ...state,
                ...action.payload
            }

        

        default:
            return state
    }
}
