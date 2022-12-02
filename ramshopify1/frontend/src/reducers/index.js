import { combineReducers } from "redux";
import auth from "./auth"
import search from './search'
import messages from './messages'
import errors from './errors'
import customer_orders from "./customer_orders";

export default combineReducers({
    auth,
    search,
    messages,
    errors,
    customer_orders
})