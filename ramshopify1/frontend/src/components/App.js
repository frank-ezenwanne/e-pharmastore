import React, {Component} from "react"
import {Provider} from 'react-redux';
import { Route, Routes} from 'react-router-dom'
import store from '../store'
import {loaduser} from '../actions/auth'
import Login from "./Login"
import Register from "./Register";
import Order from "./Order"
import Nav from "./Nav"
import Alerts from  './Alerts'
import CustomerPage from "./CustomerPage"
import { Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';


const alertOptions = {
    timeout: 5000,
    position: 'top center',
    offset:'70px'
  };
  

class App extends Component{

    componentDidMount(){
        store.dispatch(loaduser())
    }

    render(){
       
        return(
            <Provider store = {store}>
                <AlertProvider template={AlertTemplate} {...alertOptions}>
                    <Nav/>
                    <Alerts />
                    <div id = "web-pages">
                        <Routes>
                            <Route path = "login" element = {<Login/>}/>
                            <Route path = "register" element = {<Register/>}/>
                            <Route path = "order" element = {<Order/>}/>
                            <Route path = "customerpage" element = {<CustomerPage/>}/>
                        </Routes>
                    </div>
                </AlertProvider>
            </Provider>
        )
    }
}

export default App