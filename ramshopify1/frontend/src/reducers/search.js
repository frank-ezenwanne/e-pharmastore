import {BRANDS_RETRIEVED} from '../actions/types'
import {ORDER_CREATED,CHANGE_CREATED_FALSE,
    LAST_ORDER_FETCHED,
    ORDER_PRODUCT_CREATED,ORDER_PRODUCT_CREATING,ORDERS_RETRIEVED,
    ORDER_PRODUCT_NOT_CREATED,GENERIC_PRODUCTS_RETRIEVED,ORDER_MADE_LAST,
    CLEAR_GENERIC_PRODUCTS,CLEAR_LAST_ORDER_AND_ID,CLEAR_BRAND_DESC,ORDER_DELETED,RESET_ORDER_DELETED_MOVE,EMAIL_SENT
} from '../actions/types'


const initialState = {
    products:"",
    products_deep:'',
    generics:"",
    order_id:null,
    just_created:false,
    last_orderid:null,
    order_productid:'',
    current_serial:'',
    loi:{},
    orderCreating:false,
    loading_serials:{},
    generic_products: null,
    customer_orders:null,
    selected_order_made_last:false,
    last_order_status:false,
    
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

        case ORDER_DELETED:
            return{
                ...state,
                products:"",
                products_deep:'',
                generics:"",
                order_id:null,
                just_created:false,
                last_orderid:null,
                order_productid:'',
                current_serial:'',
                loi:{},
                orderCreating:false,
                loading_serials:{},
                generic_products: null,
                selected_order_made_last:false,
                order_deleted_move:true

            }
        case RESET_ORDER_DELETED_MOVE:
            return{
                ...state,
                order_deleted_move:false
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
                loading_serials:{...action.payload},
                products:'',
                products_deep:''
            }

        case ORDER_PRODUCT_CREATED:
            return{
                ...state,
                ...action.payload.data,
                loading_serials:{...action.payload.serial}
            }

        case ORDER_PRODUCT_NOT_CREATED:
            return {
                ...state,
                loading_serials:{...action.payload}
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
                order_id:null,
                products:"",
                products_deep:'',
                generics:"",
                just_created:false,
                last_orderid:null,
                order_productid:'',
                current_serial:'',
                orderCreating:false,
                loading_serials:{},
                generic_products: null,
                customer_orders:null,
                selected_order_made_last:false,
                last_order_status:false,
            }
        
        case CLEAR_BRAND_DESC:
            return {
                ...state,
                products:'',
                products_deep:'',

            }

        case EMAIL_SENT:
            return{
                ...state,
                ...action.payload,
                last_order_status:true,
            }
        

        default:
            return state
    }
}
