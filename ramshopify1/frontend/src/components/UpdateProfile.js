import React, { Component, Fragment } from "react"
import { connect } from "react-redux"
import { register } from "../actions/auth.js"
import PropTypes from "prop-types"
import { Navigate } from "react-router-dom"

class Register extends Component {
    constructor(props){
        super(props);
        this.state = {
            company_name: '',
            email: '',
            address:'',
            phone_no:'', 
            establishment:''
           
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
        const {email,company_name,address, phone_no, establishment } = this.state
            this.props.register(company_name, email, address, phone_no, establishment)
        
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
       
        const { company_name, email, address, phone_no, establishment } = this.state
        return (
            <div className=" pt-4 register-div">
                <h3 className='register-heading'> Register as a customer </h3>
                <form onSubmit={this.onsubmit}>
                    <div className='form-field'>
                    <div>
                        <label className = 'text-white' htmlFor="company_name">Company name</label>
                    </div>
                        <input id='company_name' className='user-field'
                            type='text'
                            name='company_name'
                            placeholder=' Company name'
                            onChange={this.onchange}
                            value={company_name}
                        /><br />
                    </div>

                    <div className='form-field'>
                        <div>
                            <label className = 'text-white' htmlFor="email">Email</label>
                        </div>
                        <input id ='email' className='email-field'
                            type='email'
                            name='email'
                            placeholder=' Email'
                            onChange={this.onchange}
                            value={email}
                        /><br />
                    </div>

                    <div className='form-field'>
                         <div>
                            <label className = 'text-white' htmlFor="address">Address</label>
                         </div>
                        <input id='address' className='user-field'
                            type='text'
                            name='address'
                            placeholder=' Company Address'
                            onChange={this.onchange}
                            value={address}
                        /><br />
                    </div>

                    <div className='form-field'>
                        <div>
                            <label className = 'text-white' htmlFor="phone_no">Mobile number</label>
                         </div>
                        <input id='phone_no' className='user-field'
                            type='number'
                            name='phone_no'
                            placeholder=' Company phone'
                            onChange={this.onchange}
                            value={phone_no}
                        /><br />
                    </div>

                    <div className='form-field'>
                         <div>
                            <label className = 'text-white' htmlFor="phone_no">Establishment</label>
                         </div>
                        <select id='establish'  onChange={this.onchange} name = 'establishment' value = {establishment}>
                            <option disabled value = ''>--SELECT--</option>
                            <option value = 'HOS'>Hospital</option>
                            <option value = 'CLHE'>Clinic/Health Centre</option>
                            <option value = 'PHM'>Pharmacy</option>
                            <option value = 'CHSU'>Chemist/Superstore</option>
                        </select>
                    </div>

                    <button id="submit" type="submit" className='btn btn-sm btn-dark'>Register</button>

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