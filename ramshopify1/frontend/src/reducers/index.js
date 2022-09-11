import { combineReducers } from "redux";
import auth from "./auth"
import search from './search'
import messages from './messages'

export default combineReducers({
    auth,
    search,
    messages
})