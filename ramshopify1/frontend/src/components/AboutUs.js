import React, {Component} from 'react'
import PharmCare from '../../svg/pharm_care.svg' 
import Info from '../../svg/info.svg' 
import FollowUp from '../../svg/patient_follow.svg'
import Dispensing from '../../svg/dispensing.svg'
import Distribution from '../../svg/drug_distrib.svg'
import Research from '../../svg/book.svg'
import Medicine from '../../svg/medicine.svg'
import Surgicals from '../../svg/syringe.svg'
import Devices from '../../svg/stethoscope.svg'
import Provisions from '../../svg/basket.svg'
import Logo from '../../images/logo.png'

class AboutUs extends Component{
    constructor(props){
        super(props);
        this.state = {
        }
    }

    render(){
        return(
            <div className='w-100 overflow-hidden'>
                <section className = 'position-relative' style = {{height:'30vh',backgroundColor:'rgb(240,240,240'}}>
                    <div className='top-50 start-50 translate-middle position-absolute'>
                        <div className='d-flex ' style={{fontSize:'180%', textShadow: '2px 2px 4px green'}}>
                            <div>Ramsgate Pharmacy</div>
                            <img className = 'aboutuslogo' src={Logo}/>
                        </div>
                        <div align='center' style={{fontSize:'90%',fontWeight:'bolder'}}>To Restore confidence..</div>
                    </div>
                </section>

      
                
                <section style = {{backgroundColor:'white'}}>
                    <h3 align='center'>Our Services</h3>
                    <div align='center' className = 'row gy-3'>
                        <div className='col-lg-4 col-md-6 col-12'>
                            <img src={PharmCare}/>
                            <div>Pharmaceutical care</div>
                        </div>

                        <div className='col-lg-4 col-md-6 col-12'>
                            <img src= {Info}/>
                            <div>Patient couselling</div>
                        </div>

                        <div className='col-lg-4 col-md-6 col-12'>
                            <img src={FollowUp}/>
                            <div>Patient follow-up</div>
                        </div>

                        <div className='col-lg-4 col-md-6 col-12'>
                            <img src= {Dispensing}/>
                            <div>Accurate dispensing</div>
                        </div>

                        <div className='col-lg-4 col-md-6 col-12 '>
                            <img src= {Distribution}/>
                            <div>Drug distribution</div>
                        </div>

                        <div className='col-lg-4 col-md-6 col-12 mb-3'>
                            <img src= {Research}/>
                            <div>Research</div>
                        </div>
                        
                    </div>
                </section>

                <section style = {{backgroundColor:'rgb(240,240,240'}}>
                    <h3 align='center'> We stock</h3>
                    <div  align='center' className='row gy-3'>
                        <div className='col-lg-4 col-md-6 col-12'>
                            <img src={Dispensing}/>
                            <div>Safe and Effective Medicines</div>
                        </div>

                        <div className='col-lg-4 col-md-6 col-12'>
                            <img src={Medicine}/>
                            <div>Rich supplements</div>
                        </div>

                        <div className='col-lg-4 col-md-6 col-12'>
                            <img src={Surgicals}/>
                            <div>Surgicals</div>
                        </div>

                        <div className='col-lg-4 col-md-6 col-12 '>
                            <img src={Devices}/>
                            <div>Medical Devices</div>
                        </div>


                        <div className='col-lg-4 col-md-6 col-12 mb-3'>
                            <img src={Provisions}/>
                            <div>Provisions</div>
                        </div>
                    </div>
                </section>

                <section style = {{backgroundColor:'black'}}>
                    <h3 align='center' className='text-white'>Our Location</h3>
                    <div className = '' id="location-card">
                        <div align='center' className="location-div-upper">
                            <h1 id="location-state">Lagos</h1>
                            <h5 id="location-address">60B, Agbado Road<br/>Ifako-Ijaiye 101232,<br/> Ojokoro, Lagos</h5>
                            <h5 id = "location-phone" className="mt-4">+234 803 301 0908</h5><br/><br/>
                            <h5 id= "location-time"> Open 8:00am - 8:00pm</h5>
                        </div>
                        <div className="location-div-lower">
                            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3962.810340410178!2d3.2841869172134857!3d6.670408210141324!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b973cb570e9ab%3A0x76cfcee80e3f5d6c!2sRamsgate%20Pharmacy!5e0!3m2!1sen!2sng!4v1677702290366!5m2!1sen!2sng" width="642" height="450" style={{border:"0"}} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                        </div>
		            </div>
                </section>

            </div>
        )
    }
}

export default AboutUs