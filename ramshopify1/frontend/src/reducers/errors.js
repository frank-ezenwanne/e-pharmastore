import {GET_ERRORS,EMAIL_SEND_ERROR} from '../actions/types'

const initialState = {
    msg:'',
    status:''
}

export default function errors(state=initialState, action){
    switch (action.type){
        case GET_ERRORS:
            return {
                msg: action.payload.msg,
                status: action.payload.status,
            } 

        case EMAIL_SEND_ERROR:
            return {
                msg: action.payload.msg,
                status: action.payload.status,
            }



        default:
            return state           
            
    }
}



