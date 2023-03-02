import React, {Component, Fragment} from "react"
import { connect } from "react-redux"
import {Link,Navigate} from "react-router-dom"
import {create_order,change_created_status,get_customer_orders,get_selected_order} from "../actions/search"
import Cart from '../../svg/cart.svg'
import Moment from 'react-moment'

class CustomerPage extends Component{
    constructor(props){
        super(props);
        this.state = {
            move:false
        }
    }

    pending_style ={
        color:'orange',
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
        if(this.props.order_just_created || this.props.selected_order_made_last){
            this.props.change_created_status()
            this.setState({move:true})
        }
    }

    map_orders = (order,id) =>{
        return(
            <Fragment key={id}>
                <div className="order-svg-container">
                    <img className='img-fluid order-svg-style' src= {Cart}/>
                    <div onClick = {()=>this.props.get_selected_order(order.id)} className = "order-info">
                        <div className="order-info-item order-info-create-date mb-2">
                            <Moment format="LLL">
                                {order.open_date}
                            </Moment>
                        </div>
                        <div className="order-info-id">Order Id : {order.order_code}</div>
                        <div className="order-info-item ">
                            {order.ordered_date && <Moment format="LLL">
                                order.ordered_date_date </Moment>}
                        </div>
                        <div className="order-info-item"> Item No : {order.num_items} </div>
                        <div className="order-info-item"> Status: {order.ordered === true ?
                            <span>Ordered</span> :<span style= {this.pending_style}>Pending</span>}
                        </div>
                        <div className="order-info-item"> Value: {"₦" + ' ' + order.order_total}
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
       if(!this.props.isAuthenticated){
           return <Navigate to = '/login'/>
       }
       let {has_other_pages,page_range,orders_data,current_page,num_pages} = this.props.customer_orders
       let page_arr = [] //array for pages in between 1st and last page
       let selected_page
       for(let page of page_range){ //for all pages in the avail range
           if(page !== 1 && page !== num_pages ){ //provided itz not 1st and not last page bcos those are handled separate
               if(page === current_page){ //if the page no in loop is equal to d current page in view 
                  selected_page = page //make it the selected page
               }
                if (page > current_page-6 && page < current_page + 6){//if the page num in loop in range of 6, collect it
                    page_arr.push(page)
                }
                
           }

       }
       const paginated = (
            <div align='center' className="paginator-block">
                <span onClick={()=>{this.props.get_customer_orders(1)}} className={current_page === 1? "selected-paginate":"paginate"}>First</span> 
                {page_arr.map((page_num,id)=>{return(
                    <span onClick={()=>{this.props.get_customer_orders(page_num)}} key={id} className={page_num === selected_page? 'selected-paginate': 'paginate'}>{page_num}</span>    
                )})}
                <span onClick={()=>{this.props.get_customer_orders(num_pages)}} className={current_page === num_pages? "selected-paginate":"paginate"}>Last</span>
             </div>
                // first and last lines are 4 pages 1 nd last...page_arr shows d remaining pages
       )

        return (
            <div className="customer-page">
                <div style={this.new_order_button} className = "btn btn-success" onClick={this.props.create_order}>New Order</div>
                <div className="customer-order-grid">
                    {orders_data? orders_data.map(this.map_orders):null}
                </div>

                <div className="pagination-section">
                    {has_other_pages && paginated }
                </div>
            </div>    
        )
    }
}

const mapStateToProps = (state)=>({
    email: state.auth.user.email,
    isAuthenticated : state.auth.isAuthenticated,
    order_just_created : state.search.order_just_created,
    customer_orders:state.customer_orders.customer_orders,
    selected_order_made_last:state.search.selected_order_made_last
})

export default connect(mapStateToProps,{create_order,change_created_status,get_customer_orders,get_selected_order})(CustomerPage)