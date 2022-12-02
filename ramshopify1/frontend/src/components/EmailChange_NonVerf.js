import React,{Component} from "react"
import {Link,Navigate} from 'react-router-dom'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {emailchange_nonverf} from "../actions/auth.js"


class VerifyToken extends Component{

    constructor(props){
        super(props);
        this.state = {
            email:"",
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
        this.props.emailchange_nonverf(this.props.user.email)
    }


    render(){
        if(this.props.isAuthenticated){
           return <Navigate to = "/customerpage" />
         }
        if (this.props.justverified || !this.props.user.email) {
            return <Navigate to = "/login"/>
        }


       const {token } = this.state
        return (
        <div className = "login-block">

            <h3 className = 'login-heading'> ENTER A NEW EMAIL!</h3>
            <div align="center" id="message">This will be your new email </div>
            <form onSubmit = {this.onsubmit} >
                <div className = 'form-field'>
                    <input className = 'user-field' 
                    type ='email' 
                    name ='email'
                     placeholder=' Enter new email'
                     onChange={this.onchange}
                     value = {email}
                      /><br/>   
                </div>

                <button  type = "submit" className = 'form-button'>Submit</button>

            </form>
	    </div>
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.auth.user,
    isAuthenticated : state.auth.isAuthenticated,
})

export default connect(mapStateToProps,{emailchange_nonverf})(VerifyToken)