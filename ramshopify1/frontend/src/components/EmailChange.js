import React, {Component} from 'react'
import {Link,Navigate} from 'react-router-dom'
import {change_email} from "../actions/auth.js"
import {connect} from 'react-redux'

class EmailChange extends Component{
    constructor(props){
        super(props);
        this.state = {
            old_email:'',
            new_email:'',
            password:'',
        }
    }

    onchange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    onsubmit = (e) => {
        e.preventDefault()
        const {old_email,new_email,password} = this.state
        this.props.change_email(old_email,new_email,password)
    }

    render(){
        if(this.props.new_email_set){
            if(this.props.user_active===true){
                return <Navigate to = '/emailchange_sent'/>
            }
            else if(this.props.user_active===false){
                return <Navigate to = '/verifytoken' />
            }
        }
        const {old_email,new_email,password} = this.state
        return(
            <div className = "login-block">
            <h3 className = 'login-heading'> EMAIL CHANGE </h3>
            <form onSubmit = {this.onsubmit} >
                <div className = 'form-field'>
                    <input className = 'user-field' 
                    type ='email' 
                    name ='old_email'
                     placeholder=' Old Email'
                     onChange={this.onchange}
                     value = {old_email}
                      /><br/>   
                </div>

                <div className = 'form-field'>
                    <input className = 'user-field' 
                    type ='email' 
                    name ='new_email'
                     placeholder=' New Email'
                     onChange={this.onchange}
                     value = {new_email}
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

                <button  type = "submit" className = 'form-button'>Submit</button>

                <div id ="login-bottom-options">
                    <div className="reg-link"><Link to ="/login">Log In Instead</Link> 
                    </div>

                </div>
            </form>
	    </div> 
  
        )
    }
}

const mapStateToProps = (state) => ({
user_active : state.auth.user_active,
new_email_set:state.auth.new_email_set
})

export default connect(mapStateToProps,{change_email})(EmailChange)