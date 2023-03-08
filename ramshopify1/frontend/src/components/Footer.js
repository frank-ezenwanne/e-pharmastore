import React,{Component} from 'react'
import {Link} from 'react-router-dom'
import Email from '../../svg/email.svg'
import Facebook from '../../svg/facebook.svg'
import Phone from '../../svg/phone.svg'
import Whatsapp from '../../svg/whatsapp.svg'
import {connect} from "react-redux"


class Footer extends Component{
    constructor(props){
        super(props);
        this.state={

        }
    }//end of constructor


    render(){
        return(
            <footer style= {{fontSize:'80%'}}>
                <section id ='footer-upper'>
                    <div id ='upper-left-footer'>
                        {this.props.isAuthenticated?
                            <span className = ""><Link style = {{textDecoration:'none',color:'white'}} to ='/customerpage'>View Orders</Link></span>
                            :<span className = ""><Link style = {{textDecoration:'none',color:'white'}} to ='/register'>Register</Link></span>
                        }
                    </div>
                    <div id ='upper-right-footer'>
                        <h5 id= "footer-contact"> Contact</h5>
                        <div className = 'd-flex flex-column flex-md-row '>
                            <ul id="contact-email-div">
                                <li className="contact-email d-inline-block d-flex">
                                    <img src = {Email}/>	
                                    <span className= "d-inline-block footer-email"><Link style= {{color:'white', textDecoration:'none'}} to="mailto:ramsgatepharm@gmail.com">ramsgatepharm</Link></span>
                                </li>
                                
                                <li className=" contact-social d-flex d-block mt-3">
                                    <img src = {Facebook} className="d-inline-block footer-fb"/>
                                    <span className = "d-inline-block"  id="footer-facebook" ><Link style= {{color:'white',textDecoration:'none'}} to = "https://www.facebook.com/ramsgatepharmacyng" >Ramsgate Pharmacy</Link></span>                            
                                </li>
                            </ul>	

                            <ul id="contact-phone-div">
                                <li className="d-flex contact-phone mb-1">
                                    <img src = {Whatsapp}/>	
                                    <span className ="text-warning d-inline-block footer-phone"> <Link style= {{color:'white',textDecoration:'none'}} to ="https://api.whatsapp.com/send/?phone=2348055065881&text&app_absent=0%22">+234-8055065881</Link></span>
                                </li>
                                <li className="d-flex contact-phone">
                                    <img src = {Phone}/>	
                                    <span className ="text-warning d-inline-block footer-phone"> <Link style= {{color:'white',textDecoration:'none'}} to ="tel:+2348055065881" >+234-8055065881</Link></span>
                                </li>

                                
                            </ul>
                            
                        </div>
                    </div>
                </section>

                <section align="center" id = 'lower-footer'>
				    Programming and Design By <a className='text-white' id="frank-linkedin" href="https://www.linkedin.com/in/frank-ezenwanne/">Frank</a>
                </section>
            </footer>
        )
    }

}

const mapStateToProps = (state) => {
	return {
	    isAuthenticated : state.auth.isAuthenticated,
    }
}


export default connect(mapStateToProps)(Footer)