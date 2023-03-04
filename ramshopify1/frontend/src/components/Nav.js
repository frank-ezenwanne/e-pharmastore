import React, {Fragment,useState,useRef} from "react"
import {Link} from 'react-router-dom'
import {connect} from "react-redux"
import {logout} from "../actions/auth"
import Building from '../../svg/building.svg'



function Nav(props){
	console.log(props.isAuthenticated,90)
    const [linecolor,setLinesColor] = useState("")
    const transbar_linenav = useRef()
    const transbar_sidebar = useRef()

    const lines_white_internal = {
        backgroundColor:linecolor
    }

    const side_bar_active = {
        transform:'translateX(0%)'
    }


	const logout_func = (e) => {
		props.logout()
	}

	const mouseOver= (e) => {
		setLinesColor("white")
        
	}

    const mouseOut= (e) => {
		setLinesColor("rgb(210,210,210)")
        
	}

    const transbar = () => {
        transbar_linenav.current.classList.toggle("toggle")
        transbar_sidebar.current.classList.toggle("side-bar-active")
    }
     

    const guestlinks = (<span className= "nav-bar-others" ><Link to = "/login">Sign In</Link></span>)
    const authlinks = <div className= "nav-bar-other-group"><img src={Building}/><span className= ""> Hi {props.company_name}</span>
						</div>

    const lines = ["line1","line2","line3"]
        return ( 
			<div style= {{fontSize:'85%'}}>
				<nav>
					<div onClick = {transbar} onMouseOver={mouseOver} onMouseOut = {mouseOut} ref = {transbar_linenav} className = "line-nav">
                       {lines.map((line,key) =>{
                        return(
                        <div key = {key} style = {lines_white_internal} className = {line +" "+ "line"} ></div>)})}
                    </div>

					<div id="nav-items-section">
						
						<div id="nav-main-name">
							<span className ="nav-bar-gamersblog">
								<Link to = "/">
									<span id= "navbar-name1">RAMSGATE</span>
									<span id= "navbar-name2">PHARMACY</span>
								</Link>
							</span>
						</div>

						<div id="nav-bar-others">

							{props.isAuthenticated ? authlinks:guestlinks}	
						</div>

					</div>
					
				</nav>
				
				
				<div ref = {transbar_sidebar} className = "side-bar">
					{props.isAuthenticated?<Fragment>
					<div className = "side-bar-combo">
						<span className = "side-bar-email">{props.email}</span>
						<span className="lower-side-bar "><Link style = {{textDecoration:'none',color:'white'}} to ='/aboutus'>About Us</Link></span>
						<span className = "lower-side-bar"><Link style = {{textDecoration:'none',color:'white'}} to ='/customerpage'>View My Orders</Link></span>
						<span onClick = {()=>{props.logout()}} className = "text-white lower-side-bar">Logout</span>
					</div>
					</Fragment>:
					<Fragment>
					<div className = "side-bar-combo">
						<span className="lower-side-bar"><Link style = {{textDecoration:'none',color:'white'}} to ='/aboutus'>About Us</Link></span>
						<span className = "lower-side-bar"><Link style = {{textDecoration:'none',color:'white'}} to ='/login'>Login</Link></span>
						<span className = "lower-side-bar"><Link style = {{textDecoration:'none',color:'white'}} to ='/register'>Register</Link></span>
						
					</div>
					</Fragment>
					 }
					
				</div>

		
				{/* <div class = "side-bar">
					<span class = "lower-side-bar" href ="{%url 'register' %}">Register</span>
					<span class = "lower-side-bar" href ="{%url 'login' %}">Login</span>
				</div> */}
                
			</div>
	
		
        )
    }



const mapStateToProps = (state) => {
	return {
	isAuthenticated : state.auth.isAuthenticated,
	email:state.auth.user.email,
	company_name:state.auth.user.company_name}
}

export default connect(mapStateToProps,{logout})(Nav)

