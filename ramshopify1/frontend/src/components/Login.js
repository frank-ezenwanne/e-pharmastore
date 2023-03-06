import React,{Component} from "react"
import {Link,Navigate} from 'react-router-dom'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {login} from "../actions/auth.js"


class Login extends Component{
    constructor(props){
        super(props);
        this.state = {
            email:"",
            password:""
        }
    }

    static propTypes = {
        login:PropTypes.func,
        justregistered:PropTypes.bool

    }

    
   
    onchange = (e) => {
        this.setState({...this.state,
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
         if(this.props.user_active === false){ //false means logged in but not fully active unlike no_value which means not logged in at all
             return <Navigate to = '/verifytoken' />
         }
       const {email, password } = this.state
       const justverified_div = (<div align="center" id="message">Your account has been 
       successfully activated..You can now login</div>)

        return (
        <div className = "login-block ">
            {this.props.justverified && justverified_div }
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

                <div className='d-flex justify-content-around align-items-baseline w-100' align='center'>
                    <button  type = "submit" className = 'btn btn-sm btn-dark '>Login</button>
                    <div className="clickable  reg-link " style={{textDecoration :'none',fontSize:'85%'}}><Link to ="/password-reset">Forgot Password?</Link> </div>
                </div>
                

                <div id ="login-bottom-options">
                    <div className="reg-link"> Not yet a customer? <Link to ="/register">Register</Link> 
                    </div>

                </div>
            </form>
	    </div>
        )
    }
}

const mapStateToProps = (state) => ({
    justregistered:state.auth.justregistered,
    isAuthenticated : state.auth.isAuthenticated,
    justverified:state.auth.justverified,
    user_active:state.auth.user_active
})

export default connect(mapStateToProps,{login})(Login)