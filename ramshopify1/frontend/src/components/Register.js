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
            address : "", 
            phone_number : "",
            establishment :"" 
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
        const {email,company_name, password, password2, address, phone_number, establishment} = this.state
        if(establishment === 'SELECT'){
            alert('Establishment not selected')
            return
        }
        if (password === password2) {
            const newUser = {
                password,
                email,
                company_name,
                address, 
                phone_number,
                establishment 
            }
      
            this.props.register(newUser)
        }

        else{
            alert('Passwords do not match!')
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
       
        const { company_name, email, password, password2, address, phone_number, establishment } = this.state
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
                    <div className='form-field'>
                        <textarea className='address-field rounded'
                            type='text'
                            name='address'
                            placeholder=' Company Address'
                            onChange={this.onchange}
                            value={address}>
                         </textarea> <br />
                    </div>
                    <div className='form-field'>
                        <input className='phone-field'
                            type='number'
                            name='phone_number'
                            placeholder=' Official phone no'
                            onChange={this.onchange}
                            value={phone_number}
                        /><br />
                    </div>
            
                    <div className='form-field'>
                        {/* <input className='establishment-field'
                            type='text'
                            name='establishment'
                            placeholder=' Type of Establishment'
                            onChange={this.onchange}
                            value={establishment}
                        /><br /> */}

                        <select className='establishment-field' name = 'establishment' onChange={this.onchange} value = {this.state.establishment}>
                            <option value="SELECT">SELECT</option>
                            <option value="HOS">Hospital</option>
                            <option value="CLHE">Clinic/Health Centre</option>
                            <option value="PHM">Pharmacy</option>
                            <option value="CHSU">Chemist/Superstore</option>
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