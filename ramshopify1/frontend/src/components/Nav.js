import React, {useState,useRef} from "react"
import {Link} from 'react-router-dom'
import {connect} from "react-redux"
import {logout} from "../actions/auth"



function Nav(props){
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
    const authlinks = <div className= "nav-bar-other-group"><span className= "nav-bar-other-inner" >Start</span>
							<span onClick = {logout_func} className= "nav-bar-other-inner" >Logout</span></div>

    const lines = ["line1","line2","line3"]
		// console.log(props.auth.user.username)
        return ( 
			<div>
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
									<span id= "navbar-name1">Find</span>
									<span id= "navbar-name2">Here</span>
								</Link>
							</span>
						</div>

						<div id="nav-bar-others">
							<span className= "nav-bar-others" >Latest</span>
						{props.isAuthenticated ? authlinks:guestlinks}	
						
						</div>

					</div>
					
				</nav>
				
				
				<div ref = {transbar_sidebar} className = "side-bar">
					<span className = "side-bar-email">user</span>
					<span className = "lower-side-bar">View Your Posts</span>
					<span className = "lower-side-bar">Posts You Commented On</span>
					<span className = "lower-side-bar">Logout</span>
				</div>

		
				{/* <div class = "side-bar">
					<span class = "lower-side-bar" href ="{%url 'register' %}">Register</span>
					<span class = "lower-side-bar" href ="{%url 'login' %}">Login</span>
				</div> */}
                
			</div>
	
		
        )
    }



const mapStateToProps = (state) => ({
	isAuthenticated : state.auth.isAuthenticated,
	auth:state.auth
})

export default connect(mapStateToProps,{logout})(Nav)

