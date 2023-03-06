import React, { Component, Fragment } from "react"
import { connect } from "react-redux"
import { getProfile, updateProfile } from "../actions/auth.js"
import PropTypes from "prop-types"
import { Navigate } from "react-router-dom"

class UpdateProfile extends Component {
    constructor(props){
        super(props);
        this.state = {
            company_name: '',
            address:'',
            phone_no:'', 
            establishment:''
           
        }
    }

    componentDidMount(){
        this.props.getProfile()
    }
    componentDidUpdate(prevProps){
        const {profile, ...rest} = this.props
        if(JSON.stringify(profile) !== JSON.stringify(prevProps.profile)){
            this.setState({
                ...rest,
                company_name:profile.company_name,
                address:profile.address,
                phone_no:profile.phone_no,
                establishment:profile.establishment
            })
        }
    }
 

    static propTypes = {
        updateProfile: PropTypes.func.isRequired,
        isAuthenticated: PropTypes.bool
    }


    onchange = (e) => {
        this.setState({...this.state,
            [e.target.name]: e.target.value
        })
    }

    onsubmit = (e) => {
        e.preventDefault()
        const {company_name,address, phone_no, establishment } = this.state
            this.props.updateProfile(company_name, address, phone_no, establishment)
        
    }

    render() {
       
        const { company_name,address, phone_no, establishment } = this.state
        return (
            <div className=" pt-4 register-div">
                <h3 className='register-heading'> Update Customer Profile </h3>
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
                            value={company_name || ''}
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
                            value={address || ''}
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
                            value={phone_no || ''}
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

                    <button id="submit" type="submit" className='btn btn-sm btn-dark'>Update</button>

                </form>

            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    justregistered : state.auth.justregistered,
    profile : state.auth.profile
})

export default connect(mapStateToProps, { getProfile,updateProfile })(UpdateProfile)