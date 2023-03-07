import React, {Component} from "react"
import {Provider} from 'react-redux';
import { Route, Routes} from 'react-router-dom'
import store from '../store'
import {loaduser} from '../actions/auth'
import Home from "./Home"
import ErrorBoundary from "./ErrorBoundary"
import Login from "./Login"
import Register from "./Register";
import Profile from './UpdateProfile'
import AboutUs from "./AboutUs";
import Order from "./Order"
import Nav from "./Nav"
import Footer from './Footer'
import VerifyToken from "./VerifyToken";
import EmailChange from "./EmailChange";
import Alerts from  './Alerts'
import CustomerPage from "./CustomerPage"
import { Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import EmailChangeSent from "./EmailChangeSent";
import EmailChangeConfirm from "./EmailChangeConfirm";
import PrivateRoute from "./PrivateRoute";
import PasswordChange from './PassReset/PasswordChange'
import PasswordReset from './PassReset/PasswordReset'
import PasswordResetDone from './PassReset/PasswordResetDone'


const alertOptions = {
    timeout: 4000,
    position: 'top center',
    offset:'70px',
    containerStyle :{
        fontSize:'75%',
        marginLeft:'auto',
        marginRight:'auto',
        zIndex:'500'
    }
  };
  

class App extends Component{

    componentDidMount(){
        store.dispatch(loaduser())
    }

    render(){
       
        return(
            <Provider store = {store}>
                <AlertProvider template={AlertTemplate} {...alertOptions}>
                    <ErrorBoundary>
                        <section id='top-body'>
                            <Nav/>
                            <Alerts/>
                            <div id = "web-pages">
                                <Routes>
                                    <Route path = "/" element = {<Home/>}/>
                                    <Route path = "login" element = {<Login/>}/>
                                    <Route path = "register" element = {<Register/>}/>
                                    <Route path = "aboutus" element = {<AboutUs/>}/>
                                    <Route element = {<PrivateRoute/>}>
                                        <Route path = "order" element = {<Order/>}/>
                                        <Route path = "profile" element = {<Profile/>}/>
                                        <Route path = "customerpage" element = {<CustomerPage/>}/>
                                    </Route>
                                    <Route path = "verifytoken" element = {<VerifyToken/>}/>
                                    <Route path = "password-reset" element = {<PasswordReset/>}/>
                                    <Route path = "password-reset-done" element = {<PasswordResetDone/>}/>
                                    <Route path = "password-change/:token" element = {<PasswordChange/>}/>
                                    <Route path = "emailchange" element = {<EmailChange/>}/>
                                    <Route path = "emailchange_sent" element = {<EmailChangeSent/>}/>
                                    <Route path = "emailchange/:token" element = {<EmailChangeConfirm/>}/>
                                    {/* <Route path = "emailchange_confirm" element = {<EmailChangeConfirm/>}/> */}
                                </Routes>
                            </div>
                        </section>
                        <section id='bottom-body'>
                            <Footer/>
                        </section>
                    </ErrorBoundary>
                </AlertProvider>
            </Provider>
        )
    }
}

export default App