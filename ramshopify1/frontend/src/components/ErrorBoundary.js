import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'

class ErrorBoundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = { move:false,hasError: false ,errorArray:{error:'',errorInfo:''}};
    }

    logErrorToDev = (error,errorInfo)=>{
        console.log(error,errorInfo)
        const config={
            headers:{
                "Content-Type":"application/json"
            }
        }
        const body = JSON.stringify({error,errorInfo}) 
        axios
        .post('api/notifyDev',body,config)
        .then((res)=>{
                console.log('Error message sent')
        })
        .catch(
            (err) => {
               console.log('Error message not sent')
            }
        )
    }

  
    static getDerivedStateFromError(error) {
      // Update state so the next render will show the fallback UI.
      return { hasError: true };
    }
  
    componentDidCatch(error, errorInfo) {
      this.setState({...this.state,errorArray:{...this.state.errorArray,
        error:error.toString(),
        errorInfo:JSON.stringify(errorInfo)}},()=>{
            this.logErrorToDev(this.state.errorArray.error, this.state.errorArray.errorInfo)
        })
  
    }
  
    render() {
      if(this.state.move){
          window.history.pushState({},'Page','/')
          window.location.reload(true)
      }
      if (this.state.hasError) {
        return (
        <div className=' position-absolute start-50 translate-middle text-white login-block'style={{fontSize:'90%',top:'25%'}}>
            An error has occured..
            <div className='text-danger'>{this.state.errorArray.error}</div>

            <div className='mt-4'>
                Click this link to go to homepage
                <div onClick={()=>this.setState({...this.state,move:true})} className='ms-2  d-inline btn-sm btn-dark '>
                    <Link style = {{textDecoration:'none',color:'white'}} to ="/">Homepage</Link>
                </div>
            </div>
        </div>)
      }
  
      return this.props.children; 
    }
  }

  export default ErrorBoundary