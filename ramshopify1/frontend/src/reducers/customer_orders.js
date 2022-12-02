import {ORDERS_RETRIEVED} from '../actions/types'
const initialState = {
    customer_orders:{has_other_pages:false,page_range:[],orders_data:[],current_page:1,num_pages:1}
}

export default function (state = initialState,action){
    switch(action.type){
        case ORDERS_RETRIEVED:
            return{
                ...state,
                ...action.payload
            } 

        default:
            console.log('het')
            return state
    }
        
}