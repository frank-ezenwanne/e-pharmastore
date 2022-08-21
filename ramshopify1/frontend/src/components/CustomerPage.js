import React, {Component} from "react"
import { connect } from "react-redux"
import {Link,Navigate} from "react-router-dom"
import {create_order,change_created_status} from "../actions/search"



class CustomerPage extends Component{
    state={
        move:false
    }

    componentDidUpdate(prevProps){
        if(this.props.just_created){
            console.log(23)
            this.props.change_created_status()
            this.setState({move:true})
        }
    }

    render(){
       if(this.state.move){
           return <Navigate to = '/order'/>
       }
        return (
            <div className="customer-page">
                Welcome {this.props.email}<br/>
                
                Go to <span className ="order-create-button" onClick={this.props.create_order}>Order</span>
            </div>
        )
    }
}

const mapStateToProps = (state)=>({
    email: state.auth.email,
    just_created : state.search.just_created
})

export default connect(mapStateToProps,{create_order,change_created_status})(CustomerPage)