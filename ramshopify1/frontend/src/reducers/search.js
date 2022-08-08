import {BRANDS_RETRIEVED} from '../actions/types'

const initialState = {
    products:"",
    generics:""
}

export default function (state = initialState,action){
    switch(action.type){
        case BRANDS_RETRIEVED:
            return {
                ...state,
                ...action.payload
            }

        default:
            return state
    }
}
