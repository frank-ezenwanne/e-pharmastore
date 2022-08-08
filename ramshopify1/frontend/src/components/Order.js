import React, {Component,Fragment} from "react"
import {connect} from 'react-redux'
import {search_brand} from "../actions/search"
import ReactDOM from 'react-dom';

// USE COMPON DID UPDATE TO PUT ReactDOM.findDOMNode(this.textInput.current).focus() ..FIND OUT MEANING OF RENDER PURE FUNC ONLY

class Order extends Component{
    constructor(props){
        super(props);
        this.textInput = React.createRef();
        this.state = {
            id_list : [1],
            1:{generic:"",
                clicked:"0",
                   brand:"",        
                    unit:"",
                    quantity:"",
                    cost:"",
                    total:""
                },
            first_letter:"",
            remove_list : {
                display:"block"
            }
            }
    }

unit_style = {
    width:"7rem",
}
quantity_style={
    width:"6rem"
}
cost_style ={
    width:"7rem"
}

total_style={
    width:"4rem"
}




onClickDrug = (e) =>{
    const brand = e.target.getAttribute('data-prod')

    const c_name = e.target.className
    return this.setState({
        ...this.state,
        [c_name] : {...this.state[c_name],brand:brand},
        remove_list:{display:"none"}
    })
}

brand_change=(e)=>{
    const val = e.target.value
    const name_attrib = e.target.name
    const c_name = e.target.className
    // console.log(val[0])
    this.setState({...this.state,
        [c_name]: {...this.state[c_name],brand:val},
        remove_list:{display:"block"}
        
        },()=>{
            console.log(this.state[c_name][name_attrib])
            if(this.state[c_name][name_attrib] && this.state[c_name][name_attrib][0] === this.state.first_letter){
                console.log("yeeah")
                if (this.props.products){
                    console.log(this.props.products) // fix products as list under innput
                    }
    
                else{
                    console.log("no product found") //create message or alert later in frontend or ntn
                    }//print no prod found and search again
             }
    
            else{
                this.setState({...this.state,first_letter : val[0]})
                if(val[0]){
                    this.props.search_brand(val[0],c_name)
                } 
                else{
                    // make list disappear
                }
                
            }
    })

    // console.log(this.state.first_letter)
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
    this.setState({[e.target.name]:e.target.value},()=>{console.log(this.state.zen)})
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
       const new_latest = id_list[id_list.length-1]+1
       id_list.push(id_list[id_list.length-1]+1)
       this.setState({...this.state,
           id_list,
           [new_latest]:{generic:"",
           brand:"",        
            unit:"",
        },
       })
    }
}

map_stuff = (num) =>{  
    num = String(num)
    console.log(this.state[num].brand)
    return (
       
    <section className="table-section" key={num}>
        <div>
          <input
              className={num}
              type="text"
              name="brand"
              onChange={this.brand_change}
              value = {this.state[num]["brand"]}
            //   onMouseOut = {this.remove_list}
          />
          <div style = {this.state.remove_list} className ="list-section" >
                {this.props.products[num]? this.props.products[num].map( (product,id)=>{
                    const input_length = this.state[num].brand.length
                    const brand_slice=product.brand_description.slice(0,input_length)
                    if(brand_slice.toLowerCase() === this.state[num].brand.toLowerCase() ){
                        return(
                    <div className="drugitem-cover" key={id}>
                        <div className='drugitem stretch' >
                            <div data-id = {id} data-prod = {product.brand_description} className={num} onClick = {this.onClickDrug}>{product.brand_description}</div>
                        </div>
                    </div>)
                    }
                }):console.log(5555)}
          </div> 
        </div>
        
        <div>
            <input
                className={num}
                type="text"
                name="generic"
                onChange={this.generic_change}
                value = {this.state[num]["generic"]}
            />
        </div> 
        

        <div>
            <input
                className={num}
                type="text"
                name="unit"
                onChange={this.unit_change}
                onBlur ={this.onunitInput}
                value = {this.state[num]["unit"]}
                style = {this.unit_style}
            />
        </div> 

        <div>
            <input
                className={num}
                type="number"
                min="1"
                name="quantity"
                onChange={this.quantity_change}  
                value = {this.state[num]["quantity"]}
                style = {this.quantity_style}
            />
        </div> 

        <div>
            <input
                className={num}
                type="number"
                name="cost"
                onChange={this.cost_change}
                value = {this.state[num]["cost"]}
                style = {this.cost_style}
            />
        </div> 

        <div>
            <input
                className={num}
                type="number"
                name="total"
                onChange={this.total_change}
                onBlur ={this.onunitInput}
                value = {this.state[num]["total"]}
                size="4"
                 
            />
        </div> 
        
    </section>
         )

}

render(){
    const products = this.props.products
    const {id_list,...a} = this.state
    return (
        <form>
                <div>
                    {id_list.map(this.map_stuff)}
                </div>
        </form>
    )
}
}


const mapStateToProps = (state) => ({
    products : state.search.products
})
export default connect(mapStateToProps,{search_brand})(Order)