import React,{Component} from "react"
import {Link,Navigate} from 'react-router-dom'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {login} from "../actions/auth.js"


class Login extends Component{
    state = {
        email:"",
        password:""
    }

    static propTypes = {
        login:PropTypes.func,
        justregistered:PropTypes.bool

    }

   

    onchange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    onsubmit = (e) => {
        e.preventDefault()
        const {email, password } = this.state
        this.props.login(email, password)
    }


    render(){

       if(this.props.isAuthenticated){
           return <Navigate to = "/customerpage" />
       }
       const {email, password } = this.state
       const justregdiv = (<div align="center" id="message">Your account has been 
       successfully created..You can now login</div>)

        return (
        <div className = "login-block">
            {this.props.justregistered && justregdiv }
            <h3 className = 'login-heading'> LOGIN </h3>
            <form onSubmit = {this.onsubmit} >
                <div className = 'form-field'>
                    <input className = 'user-field' 
                    type ='email' 
                    name ='email'
                     placeholder=' Email'
                     onChange={this.onchange}
                     value = {email}
                      /><br/>   
                </div>

                <div className = 'form-field'>
                    <input className = 'pass1-field'
                     type ='password' 
                     name ='password' 
                     placeholder=' Password'
                     onChange={this.onchange}
                     value = {password}
                      /><br/>
                </div>

                <button  type = "submit" className = 'form-button'>Login</button>

                <div id ="login-bottom-options">
                    <div className="reg-link"> Not yet a member? <Link to ="/register">Join Us</Link> 
                    </div>

                </div>
            </form>
	    </div>
        )
    }
}

const mapStateToProps = (state) => ({
    justregistered:state.auth.justregistered,
    isAuthenticated : state.auth.isAuthenticated
})

export default connect(mapStateToProps,{login})(Login)