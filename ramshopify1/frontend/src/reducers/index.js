import { combineReducers } from "redux";
import auth from "./auth"
import search from './search'
import messages from './messages'
import errors from './errors'

export default combineReducers({
    auth,
    search,
    messages,
    errors
})