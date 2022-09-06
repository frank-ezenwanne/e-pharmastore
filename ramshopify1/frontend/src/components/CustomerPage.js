import React, {Component, Fragment} from "react"
import { connect } from "react-redux"
import {Link,Navigate} from "react-router-dom"
import {create_order,change_created_status,get_customer_orders,get_selected_order} from "../actions/search"
import Cart from '../../svg/cart.svg'
import Moment from 'react-moment'

class CustomerPage extends Component{
    state={
        move:false
    }

    pending_style ={
        color:'white',
        fontWeight:'bolder',
        textShadow:'0.01rem 0.01rem red'
    }
   

    new_order_button = {
        marginLeft:"1rem"
    }

    componentDidMount(){
        this.props.get_customer_orders()
    }

    componentDidUpdate(prevProps){
        if(this.props.just_created || this.props.selected_order_made_last){
            this.props.change_created_status()
            this.setState({move:true})
        }
    }

    map_orders = (order,id) =>{
        const {email,customer_orders,...rest} = this.props
        return(
            <Fragment key={id}>
                <div className="order-svg-container">
                    <img className='img-fluid order-svg-style' src= {Cart}/>
                    <div onClick = {()=>this.props.get_selected_order(order.id)} className = "order-info">
                        <div className="order-info-item order-info-create-date">Created:<br/>
                            <Moment format="LLL">
                                {order.open_date}
                            </Moment>
                        </div>
                        <div className="order-info-item ">
                            {order.ordered_date && <Moment format="LLL">
                                order.ordered_date_date </Moment>}
                        </div>
                        <div className="order-info-item"> Item No : {order.num_items} </div>
                        <div className="order-info-item"> Status: {order.ordered === true ?
                            <span>Ordered</span> :<span style= {this.pending_style}>Pending</span>}
                        </div>
                        <div className="order-info-item"> Value: {order.order_total}
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }

    render(){

      
       if(this.state.move){
           return <Navigate to = '/order'/>
       }
        return (
            <div className="customer-page">
                <div style={this.new_order_button} className = "btn btn-success" onClick={this.props.create_order}>New Order</div>
                <div className="customer-order-grid">
                    {this.props.customer_orders ? this.props.customer_orders.map(this.map_orders):null}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state)=>({
    email: state.auth.email,
    just_created : state.search.just_created,
    customer_orders:state.search.customer_orders,
    selected_order_made_last:state.search.selected_order_made_last
})

export default connect(mapStateToProps,{create_order,change_created_status,get_customer_orders,get_selected_order})(CustomerPage)