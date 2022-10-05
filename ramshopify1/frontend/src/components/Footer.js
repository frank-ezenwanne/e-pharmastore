import React,{Component} from 'react'
import {Link} from 'react-router-dom'
import Email from '../../svg/email.svg'
import Facebook from '../../svg/facebook.svg'
import Phone from '../../svg/phone.svg'
import Whatsapp from '../../svg/whatsapp.svg'


class Footer extends Component{
    constructor(props){
        super(props);
        this.state={

        }
    }//end of constructor


    render(){
        return(
            <footer>
                <section id ='footer-upper'>
                    <div id ='upper-left-footer'>
                        View Orders
                    </div>
                    <div id ='upper-right-footer'>
                        <h5 id= "footer-contact"> Contact</h5>
                        <div className = 'contact-email-phone'>
                            <ul id="contact-email-div">
                                <li className="contact-email d-inline-block d-flex">
                                    <img src = {Email}/>	
                                    <span className= "d-inline-block footer-email"><Link style= {{textDecoration:'none'}} to="mailto:ramsgatepharm@gmail.com">ramsgatepharm@gmail.com</Link></span>
                                </li>
                                <li className="contact-email d-inline-block d-flex w-100">
                                    <img src = {Email}/>	
                                    <span className= "d-inline-block footer-email"><Link style= {{textDecoration:'none'}}  to="mailto:ramsgatepharmltd@gmail.com">ramsgatepharmltd@gmail.com</Link></span>
                                </li>
                                <li className=" contact-social d-flex d-block mt-3">
                                    <img src = {Facebook} className="d-inline-block footer-fb"/>
                                    <span className = "d-inline-block"  id="footer-facebook" ><Link style= {{textDecoration:'none'}} to = "https://www.facebook.com/ramsgatepharmacyng" >Ramsgate Pharmacy</Link></span>                            
                                </li>
                            </ul>	

                            <ul id="contact-phone-div">
                                <li className="contact-phone mb-1">
                                    <img src = {Whatsapp}/>	
                                    <span className ="text-warning d-inline-block footer-phone"> <Link style= {{textDecoration:'none'}} to ="https://api.whatsapp.com/send/?phone=2348055065881&text&app_absent=0%22">+234-8055065881</Link></span>
                                </li>
                                <li className="contact-phone">
                                    <img src = {Phone}/>	
                                    <span className ="text-warning d-inline-block footer-phone"> <Link style= {{textDecoration:'none'}} to ="tel:+2348055065881" >+234-8055065881</Link></span>
                                </li>

                                
                            </ul>
                            
                        </div>
                    </div>
                </section>

                <section align="center" id = 'lower-footer'>
				    Creative Content and Design By <a id="frank-linkedin" href="https://www.linkedin.com/in/frank-ezenwanne/">Pharm Frank</a>
                </section>
            </footer>
        )
    }

}

export default Footer