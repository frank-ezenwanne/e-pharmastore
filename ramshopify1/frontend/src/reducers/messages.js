import {CREATE_MESSAGE,TRIGGER_HOME} from '../actions/types'

const initialState = {
 
}

export default function messages(state=initialState, action){
    switch (action.type){
        case CREATE_MESSAGE:
            return {...action.payload}
                
        default:
            return state           
            
    }
}
