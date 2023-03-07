import { CREATE_MESSAGE, GET_ERRORS,EMAIL_SEND_ERROR,EMAIL_SENT} from "./types"

export const createMessage = (msg) =>{
    return {
        type:CREATE_MESSAGE,
        payload:msg
    }
}

export const returnErrors = (msg,status) =>{
    return {
        type: GET_ERRORS,
        payload:{msg,status}
    }
}


export const email_sent_handler = () =>{
    return {
        type:EMAIL_SENT,
    }
}

export const email_error_handler = (msg,status) =>{
    return {
        type: EMAIL_SEND_ERROR,
        payload:{msg,status}
    }
}


