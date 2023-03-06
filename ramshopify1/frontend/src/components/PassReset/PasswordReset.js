import React,{Component} from "react"
import {Link,Navigate} from 'react-router-dom'
import {resetPassword} from '../../actions/search'

class PasswordReset extends Component{
    constructor(props){
        super(props);
        this.state = {
            email:"",
        }
    }

    onchange = (e) => {
        this.setState({...this.state,
            [e.target.name] : e.target.value
        })
    }

    onsubmit = (e) => {
        e.preventDefault()
        const {email } = this.state
        this.resetPassword(email)
    }

    render(){
    const {email } = this.state
        return (
        <div className = "login-block ">
            <h3 className = 'login-heading'> Reset Password </h3>
            <form onSubmit = {this.onsubmit} >
                <div className = 'form-field'>
                    <div>
                        <label className='text-white' htmlFor="email">Enter your email</label>
                    </div>
                    <input className = 'user-field' 
                    type ='email' 
                    id='email'
                    name ='email'
                    placeholder=' Email'
                    onChange={this.onchange}
                    value = {email}
                    /><br/>   
                </div>

                <button type="submit" className='form-button'>Reset password</button>
            </form>
        </div>
        )
    }
}

export default PasswordReset
