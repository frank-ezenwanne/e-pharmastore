import {GET_ERRORS,EMAIL_SEND_ERROR} from '../actions/types'

const initialState = {
    msg:'',
    status:''
}

export default function errors(state=initialState, action){
    console.log(233)
    switch (action.type){
        case GET_ERRORS:
            console.log(209)
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



