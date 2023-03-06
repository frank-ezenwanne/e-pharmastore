import React,{Component} from "react"
import {Link,Navigate} from 'react-router-dom'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {verifytoken,resend_token} from "../actions/auth.js"


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
        this.props.verifytoken(this.props.user.email,token)
    }

    resend_token = (e)=>{
        e.preventDefault()
        this.props.resend_token(this.props.user.email)
    }
    


    render(){
        // if(this.props.isAuthenticated){
        //    return <Navigate to = "/customerpage" />
        //  }
        // if (this.props.justverified || !this.props.user.email) {
        //     return <Navigate to = "/login"/>
        // }


       const {token } = this.state
        return (
        <div className = "login-block">
            <h3 className = 'text-white login-heading'> Account Activation </h3>
            {this.props.token_resent?<div className = 'text-white'>New Token Sent!</div>:null}
            <form onSubmit = {this.onsubmit} >
                <div className = 'form-field'>
                    <div>
                        <label className = 'text-white' htmlFor="token">Token from email {this.props.user.email}</label>
                    </div>
                    <input className = 'user-field' 
                    id='token'
                    type ='text' 
                    name ='token'
                     placeholder=' Token from email'
                     onChange={this.onchange}
                     value = {token}
                      /><br/>   
                </div>

                <button  type = "submit" className = 'form-button'>Activate</button>

                <div id ="login-bottom-options">
                    <div className="reg-link"><Link to ="/emailchange"> Change Email? </Link> </div>
                    <div onClick={this.resend_token} className="clickable reg-link"> Re-request Token?</div>

                </div>
            </form>
	    </div>
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.auth.user,
    justregistered:state.auth.justregistered,
    justverified:state.auth.justverified,
    isAuthenticated : state.auth.isAuthenticated,
    token_resent:state.auth.token_resent
})

export default connect(mapStateToProps,{verifytoken,resend_token})(VerifyToken)