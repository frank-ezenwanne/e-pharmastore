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
                brand:"",        
                unit:"",
                unit_temp:"",
                quantity:"",
                price:"",
                cost:"",
                total:0,
                full_pk_quant:"",
                unit_quantity:""
                },
            first_letter:"",
            remove_list : {
                display:"block"
            }
            }
    }
product_style={
    width:"100%"
}

unit_style = {
    width:"100%",
    height:"1.87rem"
}
quantity_style={
    width:"100%"
}
cost_style ={
    width:"100%"
}

total_style={
    width:"100%"
}

generic_style = {
    width:"100%"
}






onClickDrug = (e) =>{
    const brand = e.target.getAttribute('data-prod')
    const data_serial = e.target.getAttribute('data-id')
    const c_name = e.target.className
    const product = this.props.products[c_name][data_serial]
    console.log(product)
    return this.setState({
        ...this.state,
        [c_name] : {...this.state[c_name],
            brand:brand,
            generic:product.generic_name,
            unit_temp:product.presentation,
            unit:'',
            price:product.price,
            full_pk_quant:product.full_pack_quantity,
            unit_quantity:product.unit_quantity,
            cost:"",
            total:0,
            quantity:""
        
        },
        remove_list:{display:"none"},
    })
}

brand_change=(e)=>{
    const val = e.target.value
    const name_attrib = e.target.name
    const c_name = e.target.className
    // console.log(val[0])
    this.setState({...this.state,
        [c_name]: {...this.state[c_name],brand:val,
            generic:"",
            unit_temp:"",
            unit:'',
            price:"",
            full_pk_quant:"",
            unit_quantity:"",
            cost:"",
            total:0,
            quantity:""
        },
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

}

unit_change = (e) =>{
    const val = e.target.value
    console.log(222222)
    const name_attrib = e.target.name
    const c_name = e.target.className
    this.setState({
        [c_name]: {...this.state[c_name],quantity:"",unit:val,cost:"",total:""}
    })
    
}

// onTotalInput = (e) =>{
//     const id_list = this.state.id_list
//     const current_no = parseInt(e.target.className)
//     const last_tracked_id = id_list[id_list.length-1]
//     if(current_no === last_tracked_id){
//        const new_latest = id_list[id_list.length-1]+1
//        id_list.push(id_list[id_list.length-1]+1)
//        this.setState({...this.state,
//            id_list,
//            [new_latest]:{
//             brand:"",
//             generic:"",
//             unit_temp:"",
//             unit:'',
//             price:"",
//             full_pk_quant:"",
//             unit_quantity:"",
//             cost:"",
//             total:0,
//             quantity:""
//         },
//        })
//     }
// }

quantity_change = (e) =>{
    const c_name = e.target.className
    let val = e.target.value
    if(this.state[c_name]["brand"]){
        let cost
        let val = e.target.value
        if(val <= 0){
            val = 0
        }
      console.log(val)
    
        const c_name = e.target.className
        if(this.state[c_name]["full_pk_quant"] === 1 || this.state[c_name]["unit"] === "FULL PACK"){
            cost = this.state[c_name]["price"]
    
        }
        else{
            const unit_quantity = parseInt(this.state[c_name]["unit_quantity"])
            if (typeof(unit_quantity) === "number"){
                console.log(90)
                const quant_ratio = this.state[c_name]["full_pk_quant"]/unit_quantity
                cost = this.state[c_name]["price"]/quant_ratio
                console.log(cost)
            }
            else{
                console.log(876)
                cost = this.state[c_name]["price"]/this.state[c_name]["full_pk_quant"]
            }
        }
        const total = cost * parseInt(val)
        this.setState({
            [c_name]: {...this.state[c_name],quantity:val,cost:cost.toFixed(2),total:total.toFixed(2)}
        },()=>{
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
                   generic:"",
                   unit_temp:"",
                   unit:'',
                   price:"",
                   full_pk_quant:"",
                   unit_quantity:"",
                   cost:"",
                   total:0,
                   quantity:""
                },
               })
            }
        })
    }
}
   

  


// cost_change = (e) =>{
//     const val = e.target.value
//     const c_name = e.target.className
//     this.setState({
//         [c_name]: {...this.state[c_name],cost:val}
//     })
// }

// total_change = (e) =>{
//     const val = e.target.value
//     const c_name = e.target.className
//     this.setState({
//         [c_name]: {...this.state[c_name],total:val}
//     })
// }

map_stuff = (num) =>{  
    num = String(num)
    console.log(this.state[num].brand)
    return (
       
    <Fragment key={num}>
        <div className="product-div">
          <input
               style={this.product_style}          
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
        
        <div className="generic-div">
            <input
                style = {this.generic_style}
                readOnly
                className={num}
                type="text"
                name="generic"
                onChange={this.generic_change}
                value = {this.state[num]["generic"] || ''}
            />
        </div> 
        

        <div className="unit-div">
            <select className={num} name="unit" value={this.state[num]["unit"] || ''} style = {this.unit_style} onChange = {this.unit_change}>
                {this.state[num]["full_pk_quant"] === 1 ? 
                    <option value = {this.state[num]["unit_temp"]}>{this.state[num]["unit_temp"]}</option> :
                this.state[num]["full_pk_quant"] > 1 ? 
                <Fragment>
                    <option  value = {this.state[num]["unit_temp"]}>
                        {this.state[num]["unit_temp"] + " "} 
                        ({this.state[num]["unit_quantity"]})
                    </option> 

                    <option value ='FULL PACK'>
                        {"FULL PACK" + " "}
                    ({this.state[num]["full_pk_quant"]})
                    </option>
                </Fragment> :null
                }
            </select>
        </div> 

        <div className="quantity-div">
            <input
                className={num}
                type="number"
                name="quantity"
                onChange={this.quantity_change}  
                value = {this.state[num]["quantity"] ||''}
                style = {this.quantity_style}
            />
        </div> 

        <div className="cost-div">
            <input
                readOnly
                className={num}
                type="number"
                name="cost"
                // onChange={this.cost_change}
                value = {this.state[num]["cost"] ||''}
                style = {this.cost_style}
            />
        </div> 

        <div className="total-div" >
            <input
                style = {this.total_style}
                readOnly
                className={num}
                type="number"
                name="total"
            
                // onChange={this.total_change}
                // onBlur ={this.onunitInput}
                value = {this.state[num]["total"] ||''}
               
                 
            />
        </div> 
        
    </Fragment>
         )

}

render(){
    const products = this.props.products
    const {id_list,...vals} = this.state
    let total = 0
    for (let id of id_list){
        total = parseFloat(total) + parseFloat(vals[id]["total"])
        total= total.toFixed(2)
    }
    return (
        <div className="card" id="form-container">
            <form className="form-class1">
                    <div id = "table-grid" >
                        
                            <div className="grid-headings">Product</div>
                            <div className="grid-headings">Generic</div>
                            <div className="grid-headings">Unit</div>
                            <div className="grid-headings">Quantity</div>
                            <div className="grid-headings">Unit cost</div>
                            <div className="grid-headings">Total</div>
                        
                        {id_list.map(this.map_stuff)}
                    
                    </div>
                    <div  className="total-cost">
                            {"₦" + ' ' + total}
                    </div>
            </form>
        </div>
    )
}
}


const mapStateToProps = (state) => ({
    products : state.search.products
})
export default connect(mapStateToProps,{search_brand})(Order)