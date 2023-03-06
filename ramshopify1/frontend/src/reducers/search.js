import {BRANDS_RETRIEVED} from '../actions/types'
import {ORDER_CREATED,CHANGE_CREATED_FALSE,
    LAST_ORDER_FETCHED,
    ORDER_PRODUCT_CREATED,ORDER_PRODUCT_CREATING,CLEAR_GENERIC_OPTIONS_INPUT,PREPARE_GENERIC_PRODUCTS,
    ORDER_PRODUCT_NOT_CREATED,GENERIC_PRODUCTS_RETRIEVED,ORDER_MADE_LAST,ORDER_COPY_CREATED,GENERIC_NAMES_RETRIEVED,
    CLEAR_GENERIC_PRODUCTS,CLEAR_LAST_ORDER_AND_ID,CLEAR_BRAND_DESC,ORDER_DELETED,ORDER_PRODUCTS_DELETED,ORDER_PRODUCTS_NOT_DELETED,
    RESET_ORDER_DELETED_MOVE,EMAIL_SENT
} from '../actions/types'


const initialState = {
    products:"",
    products_deep:'',
    generics:"",
    order_id:null,
    order_just_created:false,
    last_orderid:null,
    last_ordercode:null,
    order_productid:'',
    current_serial:'',
    loi:{},
    orderCreating:false,
    loading_serials:{},
    delete_serials:{},
    generic_products: null,

    selected_order_made_last:false,
    last_order_status:false,
    all_loaded_serials:{},
    order_copy_created:false,
    generic_name_prop:'',
    order_gen_products:null,
    updates:{
        'unit':{},
        'unit_name':{},
        'cost':{},  
    }

    
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
                order_just_created:true,
               ...action.payload
            }

        case ORDER_DELETED:
            return{
                ...state,
                products:"",
                products_deep:'',
                generics:"",
                order_id:null,
                order_just_created:false,
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

        case ORDER_PRODUCTS_DELETED:
            console.log(action.payload.delete_serials,907)
            return{
                    ...state,
                    delete_serials:action.payload.delete_serials
            }

        case ORDER_PRODUCTS_NOT_DELETED:
            return{
                ...state,
                delete_serials:{}
            }

        case RESET_ORDER_DELETED_MOVE:
            return{
                ...state,
                order_deleted_move:false,
                order_copy_created:false,
                current_serial:'',
                loading_serials:{},
                all_loaded_serials:{},
                products:"",
                products_deep:'',
                generics:"",
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
                order_just_created:false,
                selected_order_made_last:false
            }

        case LAST_ORDER_FETCHED:
            console.log(action.payload.updates)
            return {
                ...state,
                ...action.payload,
                
            }

        case ORDER_PRODUCT_CREATING:
            return{
                ...state,
                orderCreating:true,
                loading_serials:{...action.payload},
                all_loaded_serials:{...state.all_loaded_serials,...action.payload},
                products:'',
                products_deep:''
            }

        case ORDER_PRODUCT_CREATED:
            return{
                ...state,
                ...action.payload.data,
                loading_serials:{...action.payload.serial},
                all_loaded_serials:{...state.all_loaded_serials,...action.payload.serial}
            }

        case ORDER_PRODUCT_NOT_CREATED:
            return {
                ...state,
                loading_serials:{...action.payload},
                all_loaded_serials:{...state.all_loaded_serials,...action.payload}
            }

        case GENERIC_PRODUCTS_RETRIEVED:
            console.log(action.payload.generic_name_prop,'data')
            return {
                ...state,
                ...action.payload.data,
                generic_name_prop:action.payload.generic_name_prop
            }
        case GENERIC_NAMES_RETRIEVED:
            console.log(action.payload)
            return{
                ...state,
                ...action.payload
            }

        case CLEAR_GENERIC_PRODUCTS:
            return {
                ...state,
                generic_products:null,
                generic_name_options:null
            }

        case CLEAR_LAST_ORDER_AND_ID:
            return{
                ...state,
                loi:{},
                order_id:null,
                products:"",
                products_deep:'',
                generics:"",
                order_just_created:false,
                last_orderid:null,
                order_productid:'',
                current_serial:'',
                orderCreating:false,
                loading_serials:{},
                generic_products: null,
                customer_orders:null,
                selected_order_made_last:false,
                last_order_status:false,
                all_loaded_serials:{}
            }
        
        case CLEAR_BRAND_DESC:
            return {
                ...state,
                products:'',
                products_deep:'',

            }
        case CLEAR_GENERIC_OPTIONS_INPUT:
            return{
                ...state,
                generic_name_options:null,
                generic_name_prop:''

            }

        case EMAIL_SENT:
            return{
                ...state,
                ...action.payload,
                last_order_status:true,
            }
        
        case ORDER_COPY_CREATED:
            return{
                ...state,
                order_copy_created:true

            }

        case PREPARE_GENERIC_PRODUCTS:
            return{
                ...state,
                order_gen_products:action.payload
            }

        

        default:
            return state
    }
}
