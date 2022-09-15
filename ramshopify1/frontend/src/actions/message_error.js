import { CREATE_MESSAGE, GET_ERRORS,EMAIL_SEND_ERROR } from "./types"

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

export const email_error_handler = (msg,status) =>{
    return {
        type: EMAIL_SEND_ERROR,
        payload:{msg,status}
    }
}
