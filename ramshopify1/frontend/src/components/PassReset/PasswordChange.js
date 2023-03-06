import React, { useState} from 'react'
import {Link,useNavigate,useParams} from 'react-router-dom'
import {setNewPassword} from '../../actions/auth'
import {connect} from 'react-redux'

function PasswordChange(props){

    const navigate = useNavigate()
    const [credentials, setCredentials] = useState({
        password:'',
        password2:'',
    })


    const {token} = useParams()

    onchange = (e) => {
        setCredentials({...credentials,
            [e.target.name] : e.target.value
        })
    }

    onsubmit = async(e) => {
        e.preventDefault()
        const {password,password2} = credentials
        if (password === password2) {
            const resp = await props.setNewPassword(token,password)
            console.log(resp.status,99844)
            if(resp.status === true){
                navigate("/login")
            }
            
        }else{
            alert('Passwords do not match')
        }
        
    }

        return(
            <div className = "login-block">
            <h4 className = 'login-heading'> ENTER NEW PASSWORD</h4>
            <form onSubmit = {onsubmit} >
                <div className = 'form-field'>
                    <input className = 'user-field' 
                    type ='password' 
                    name ='password'
                     placeholder=' Enter New Password'
                     onChange={onchange}
                     value = {credentials.password}
                      /><br/>   
                </div>

                <div className = 'form-field'>
                    <input className = 'user-field' 
                    type ='password' 
                    name ='password2'
                     placeholder='Confirm Password'
                     onChange={onchange}
                     value = {credentials.password2}
                      /><br/>   
                </div>

                <button  type = "submit" className = 'form-button'>Submit</button>

            </form>
	    </div> 
  
        )
    }

const mapStateToProps = (state) => ({
    
})


export default connect(mapStateToProps,{setNewPassword})(PasswordChange)