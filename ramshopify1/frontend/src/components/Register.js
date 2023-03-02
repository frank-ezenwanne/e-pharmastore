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
                company_name,
                address,
                phone_no, 
                establishment
            }
            this.props.register(company_name, password, email, address, phone_no, establishment)
        }
    }

    render() {
        if (this.props.isAuthenticated) {
            return <Navigate to="/" />
        }

        if (this.props.justverified ===true ) {
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
       
        const { company_name, email, password, password2, address, phone_no, establishment } = this.state
        return (
            <div className="register-div">
                <h3 className='register-heading'> Register as a customer </h3>
                <form onSubmit={this.onsubmit}>
                    <div className='form-field'>
                        <input className='user-field'
                            type='text'
                            name='company_name'
                            placeholder=' Company name'
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

                    <div className='form-field'>
                        <input className='user-field'
                            type='text'
                            name='address'
                            placeholder=' Company Address'
                            onChange={this.onchange}
                            value={address}
                        /><br />
                    </div>

                    <div className='form-field'>
                        <input className='user-field'
                            type='number'
                            name='phone_no'
                            placeholder=' Company phone'
                            onChange={this.onchange}
                            value={phone_no}
                        /><br />
                    </div>

                    <div className='form-field'>
                        <select onChange={this.onchange} name = 'establishment' value = {establishment}>
                            <option value = 'HOS'>Hospital</option>
                            <option value = 'CLHE'>Clinic/Health Centre</option>
                            <option value = 'PHM'>Pharmacy</option>
                            <option value = 'CHSU'>Chemist/Superstore</option>
                        </select>
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