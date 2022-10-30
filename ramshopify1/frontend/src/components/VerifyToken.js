import React,{Component} from "react"
import {Link,Navigate} from 'react-router-dom'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {verifytoken} from "../actions/auth.js"


class VerifyToken extends Component{

    constructor(props){
        super(props);
        this.state = {
            token:"",
        }
    }
   
   

    onchange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    onsubmit = (e) => {
        e.preventDefault()
        const {token} = this.state
        this.props.verifytoken(this.props.email,token)
    }


    render(){
        if(this.props.isAuthenticated){
           return <Navigate to = "/customerpage" />
         }
        if (this.props.justverified || !this.props.email) {
            return <Navigate to = "/login"/>
        }

       const {token } = this.state
        return (
        <div className = "login-block">
       <div align="center" id="message">Enter Token sent to {this.props.email} </div>
            <h3 className = 'login-heading'> Account Activation </h3>
            <form onSubmit = {this.onsubmit} >
                <div className = 'form-field'>
                    <input className = 'user-field' 
                    type ='text' 
                    name ='token'
                     placeholder=' Token from email'
                     onChange={this.onchange}
                     value = {token}
                      /><br/>   
                </div>

                <button  type = "submit" className = 'form-button'>Activate</button>

                <div id ="login-bottom-options">
                    <div className="reg-link"><Link to ="/emailchange"> Change Email? </Link> 
                    </div>

                </div>
            </form>
	    </div>
        )
    }
}

const mapStateToProps = (state) => ({
    email: state.auth.user.email,
    justregistered:state.auth.justregistered,
    justverified:state.auth.justverified,
    isAuthenticated : state.auth.isAuthenticated
})

export default connect(mapStateToProps,{verifytoken})(VerifyToken)