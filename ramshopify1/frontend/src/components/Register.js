import React, { Component, Fragment } from "react"
import { connect } from "react-redux"
import { register } from "../actions/auth.js"
import PropTypes from "prop-types"
import { Navigate } from "react-router-dom"

class Register extends Component {
    constructor(props){
        super(props);
        this.state = {
            company_name: "",
            email: "",
            password: "",
            password2: "",
           
        }
    }
 

    static propTypes = {
        register: PropTypes.func.isRequired,
        isAuthenticated: PropTypes.bool
    }


    onchange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onsubmit = (e) => {
        e.preventDefault()
        const {email,company_name, password, password2 } = this.state
        if (password === password2) {
            const newUser = {
                password,
                email,
                company_name
            }
            this.props.register(company_name, password, email)
        }
    }

    render() {
        if (this.props.isAuthenticated) {
            return <Navigate to="/" />
        }

        if (this.props.justverified) {
            return <Navigate to = "/login"/>
        }

        if (this.props.justregistered) {
            return <Navigate to = '/verifytoken'/>
        }
    
        if(this.props.token_sent === 'success'){
            return <Navigate to = '/verifytoken'/>
        }

        if(this.props.token_sent === 'failed'){
            return <Navigate to = '/emailsetting'/>
        }
       
        const { company_name, email, password, password2 } = this.state
        return (
            <div className="register-div">
                <h3 className='register-heading'> Join Us </h3>
                <form onSubmit={this.onsubmit}>
                    <div className='form-field'>
                        <input className='user-field'
                            type='text'
                            name='company_name'
                            placeholder=' company_name'
                            onChange={this.onchange}
                            value={company_name}
                        /><br />
                    </div>

                    <div className='form-field'>
                        <input className='email-field'
                            type='email'
                            name='email'
                            placeholder=' Email'
                            onChange={this.onchange}
                            value={email}
                        /><br />
                    </div>

                    <div className='form-field'>
                        <input className='pass1-field'
                            type='password'
                            name='password'
                            placeholder=' Password'
                            onChange={this.onchange}
                            value={password}
                        /><br />
                    </div>

                    <div className='form-field'>
                        <input className='pass2-field'
                            type='password'
                            name='password2'
                            placeholder=' Retype Password'
                            onChange={this.onchange}
                            value={password2}
                        /><br />
                    </div>

                    <button id="submit" type="submit" className='form-button'>Register</button>

                </form>

            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    justregistered : state.auth.justregistered
})

export default connect(mapStateToProps, { register })(Register)