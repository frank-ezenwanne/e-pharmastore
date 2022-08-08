import React, {Component,useRef,useState} from "react"
import {connect} from 'react-redux'
import {search_brand} from "../actions/search"

function Order(props){

    const [state, setstate] = useState([1])
    const [state2, setstate2] = useState({ 1:{generic:"", brand:"",unit:"",}})
    const [state3, setstate3] = useState(first_letter:"",)


        
       
        
        zen:""
        })
    
    


brand_change=(e)=>{
    const val = e.target.value
    const name_attrib = e.target.name
    const c_name = e.target.className
    console.log(val[0])
    this.setState({...this.state,
        [c_name]: {...this.state[c_name],brand:val},
        first_letter : val[0]
        
    })
    console.log(this.state.first_letter)

    if(this.state[c_name][name_attrib] && this.state[c_name][name_attrib][0] === this.state.first_letter){
        if (this.props.products){
            console.log(this.props.products) // fix products as list under innput
        }

        else{
            console.log("no product found") //create message or alert later in frontend or ntn
        }
     }

    else{
        this.props.search_brand(this.state[c_name]["brand"])
    }
    console.log(this.state.first_letter)
}

generic_change = (e)=>{
    const val = e.target.value
    const name_attrib = e.target.name
    const c_name = e.target.className
    console.log({brand:val,...this.state[c_name]})
    this.setState({
        [c_name]: {...this.state[c_name],generic:val}
    })
    
}

zen_change = (e) =>{
    this.setState({[e.target.name]:e.target.value})
    console.log(this.state.zen)
}

unit_change = (e) =>{
    const val = e.target.value
    const name_attrib = e.target.name
    const c_name = e.target.className
    console.log({brand:val,...this.state[c_name]})
    this.setState({
        [c_name]: {...this.state[c_name],unit:val}
    })
    
}

onunitInput = (e) =>{
    const id_list = this.state.id_list
    const current_no = parseInt(e.target.className)
    const last_tracked_id = id_list[id_list.length-1]
    if(current_no === last_tracked_id){
       id_list.push(id_list[id_list.length-1]+1)
       this.setState({...this.state,
           id_list,
       })
    }
}

map_stuff = (num) =>{  
    num = String(num)
    return (
       
    <tr key={num}>
        <td>
          <input
              className={num}
              type="text"
              name="brand"
              onChange={this.zen_change}
              value = {this.state[num]["brand"]}
          />  
          
        </td>
        <td>
        <input
              className={num}
              type="text"
              name="generic"
              onChange={this.generic_change}
              value = {this.state[num]["generic"]}
          /> 
        </td>

        <td>
        <input
              className={num}
              type="text"
              name="unit"
              onChange={this.unit_change}
              onMouseOut ={this.onunitInput}
              value = {this.state[num]["unit"]}
          /> 
        </td>
    </tr>
         )

}

render(){
    // console.log(this.state.)
    const {id_list,...a} = this.state
    if(this.props.products){
        // console.log(this.props.products)
    }
    return (
        <form>
         <input
              className="clz"
              type="text"
              name="zen"
              onChange={this.zen_change}
              
          />  
            <table>
                <tbody>
                    {id_list.map(this.map_stuff)}
                </tbody>
            </table>
        </form>
    )
}
}


const mapStateToProps = (state) => ({
    products : state.search.products
})
export default connect(mapStateToProps,{search_brand})(Order)