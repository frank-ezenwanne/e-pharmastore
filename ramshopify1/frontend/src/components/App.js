import React, {Component} from "react"
import {Provider} from 'react-redux';
import { Route, Routes} from 'react-router-dom'
import store from '../store'
import {loaduser} from '../actions/auth'
import Login from "./Login"
import Register from "./Register";
import Order from "./Order"
import Nav from "./Nav"
import CustomerPage from "./CustomerPage"


class App extends Component{

    componentDidMount(){
        store.dispatch(loaduser())
    }

    render(){
       
        return(
            <Provider store = {store}>
                <Nav/>
                <div id = "web-pages">
                    <Routes>
                        <Route path = "login" element = {<Login/>}/>
                        <Route path = "register" element = {<Register/>}/>
                        <Route path = "order" element = {<Order/>}/>
                        <Route path = "customerpage" element = {<CustomerPage/>}/>
                    </Routes>
                </div>
                
            </Provider>
        )
    }
}

export default App