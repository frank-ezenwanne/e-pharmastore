import React, {Component} from "react"
import {Provider} from 'react-redux';
import { Route, Routes} from 'react-router-dom'
import store from '../store'
import Order from "./Order"

class App extends Component{

    render(){
       
        return(
            <Provider store = {store}>
                <Routes>
                    <Route index = "/" element = {<Order/>}/>
                </Routes>
                
            </Provider>
        )
    }
}

export default App