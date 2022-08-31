import {BRANDS_RETRIEVED} from '../actions/types'
import {ORDER_CREATED,CHANGE_CREATED_FALSE,
    LAST_ORDER_FETCHED,
    ORDER_PRODUCT_CREATED,ORDER_PRODUCT_CREATING,ORDERS_RETRIEVED,
    ORDER_PRODUCT_NOT_CREATED,GENERIC_PRODUCTS_RETRIEVED,ORDER_MADE_LAST,
    CLEAR_GENERIC_PRODUCTS,CLEAR_LAST_ORDER_AND_ID
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
    generic_products: null,
    customer_orders:null,
    selected_order_made_last:false
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

        case ORDERS_RETRIEVED:
          return{
              ...state,
              ...action.payload
             
          }  

        case ORDER_MADE_LAST:
            return{
                ...state,
                ...action.payload,
                selected_order_made_last:true
            }

        case CHANGE_CREATED_FALSE:
            return {
                ...state,
                just_created:false,
                selected_order_made_last:false
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

        case CLEAR_GENERIC_PRODUCTS:
            return {
                ...state,
                generic_products:null
            }

        case CLEAR_LAST_ORDER_AND_ID:
            return{
                ...state,
                loi:{},
                order_id:null
            }
        

        default:
            return state
    }
}
