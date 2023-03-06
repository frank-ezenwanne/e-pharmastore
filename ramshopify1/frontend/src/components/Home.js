import React,{Component,Fragment} from 'react'
import DrugStoreImg from '../../images/drug_store.png'
import {create_order,change_created_status} from "../actions/search"
import {connect} from 'react-redux'
import {Link,Navigate} from 'react-router-dom'


class Home extends Component{
    constructor(props){
        super(props);
        this.state={
            order_just_created:false
        }
    }

    componentDidUpdate(){
        if(this.props.order_just_created){
            this.props.change_created_status()
            this.setState({order_just_created:true})
        }
    }

    background = {
        backgroundColor:'rgb(0,0,0) !important',
		backgroundImage: `url('${DrugStoreImg}')`,
		backgroundRepeat: 'no-repeat',
		backgroundPosition:'top',
    }

    render(){
        if(this.state.order_just_created){
            return <Navigate to = '/order'/>
        }
        return(
            <div id = 'home-back-img-div w-100 overflow-none'>
                <img id='home-back-img' src = {DrugStoreImg}/>
                <div id= 'home-img-heading'>
                    <div id ='home-img-top-heading'> RAMSGATE PHARMACY </div>
                    <div id ='home-img-bottom-heading'> To Restore Confidence</div>
                </div>
                <div style= {{left:this.props.isAuthenticated?'0%':'45%'}} className = 'home-img-button-div'>
                    {this.props.isAuthenticated?
                       <div className= 'home-auth-button-div' >
                            <div className = 'btn btn-success'><Link to = '/customerpage' style= {{textDecoration:'none',color:'white'}} >My Orders</Link></div>
                            <div onClick = {()=>{this.props.create_order()}} className = 'btn btn-success'>New Order</div> 
                        </div>
                        :
                        <div className = 'home-guest-button btn btn-success'> <Link to = '/aboutus' style= {{textDecoration:'none',color:'white'}}>Take a Look</Link></div>
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps=(state)=>({
    isAuthenticated : state.auth.isAuthenticated,
    order_just_created :state.search.order_just_created
})
export default connect(mapStateToProps,{create_order,change_created_status})(Home)