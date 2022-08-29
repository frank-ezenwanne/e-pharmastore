import React, {Component,Fragment} from "react"
import {connect} from 'react-redux'
import {search_brand,get_last_order,send_orderproduct,getGenProducts} from "../actions/search"
import {TailSpin} from 'react-loader-spinner'
import Tick from '../../svg/tick.svg'
import Cross from '../../svg/cross.svg'
import _, { map } from 'underscore';
import GenericModal from './GenericModal/GenericModal'

//.FIND OUT MEANING OF RENDER PURE FUNC ONLY

class Order extends Component{
    constructor(props){
        super(props);
        this.state = {
            id_list : [1],
            1:{
                
                    product_id:'',
                    brand_description:'',
                    generic_name:'',
                    unit:'',
                    selected_unit:'',
                    raw_cost:'',
                    full_pack_quantity:'',
                    unit_quantity:0,
                    cost:0,
                    total:0,
                    quantity_ordered:""
                
                },  
            first_letter:"",
            remove_list : {
                display:"block"
            },
            modal_generic:false
            }
    }

componentDidMount(){
    this.props.get_last_order()
}

componentDidUpdate(prevProps){
    let last_elem 
    let id_list = this.state.id_list
    const {loi,...rest} = this.props
        if (Object.keys(prevProps.loi).length !== Object.keys(loi).length){
             if(Object.keys(loi).length > 0){
                 id_list=[]
                for (const id in this.props.loi){
                    id_list.push(id)
                }
                last_elem = parseInt(id_list[id_list.length-1])
                last_elem = last_elem +1
                id_list.push(String(last_elem))

             }  

            this.setState({...this.state, ...this.props.loi,id_list,[last_elem]:{
                product_id:'',
                    brand_description:'',
                    generic_name:'',
                    unit:'',
                    selected_unit:'',
                    raw_cost:'',
                    full_pack_quantity:'',
                    unit_quantity:0,
                    cost:0,
                    total:0,
                    quantity_ordered:""
            }
               
            })
        }

    
}


product_style={
    width:"100%"
}

unit_style = {
    width:"100%",
    
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
    const brand_description = e.target.getAttribute('data-prod')
    const data_serial = e.target.getAttribute('data-id')
    const c_name = e.target.className
    const product = this.props.products[c_name][data_serial]
    return this.setState({
        ...this.state,
        [c_name] : {...this.state[c_name],
            product_id:product.id,
            brand_description:brand_description,
            generic_name:product.generic_name,
            unit:product.unit,
            selected_unit:'',
            raw_cost:product.raw_cost,
            full_pack_quantity:product.full_pack_quantity,
            unit_quantity:product.unit_quantity,
            cost:"",
            total:0,
            quantity_ordered:""
        
        },
        remove_list:{display:"none"},
    })
}

brand_change=(e)=>{
    const val = e.target.value
    const name_attrib = e.target.name
    const c_name = e.target.classList[0]
    this.setState({...this.state,
        [c_name]: {...this.state[c_name],brand_description:val,
            product_id:null,
            generic_name:"",
            unit:"",
            selected_unit:'',
            raw_cost:"",
            full_pack_quantity:"",
            unit_quantity:"",
            cost:"",
            total:0,
            quantity_ordered:""
        },
        remove_list:{display:"block"}
        
        },()=>{
    
            if(this.state[c_name][name_attrib] ==="" || this.state[c_name][name_attrib][0] !== this.state.first_letter){
            
                this.setState({...this.state,first_letter : val[0]})
                if(val[0]){
                    this.props.search_brand(val[0],c_name)
                } 
    
                
            }
    })


}

generic_change = (e)=>{
    const val = e.target.value
    const name_attrib = e.target.name
    const c_name = e.target.className
    console.log({brand_description:val,...this.state[c_name]})
    this.setState({
        [c_name]: {...this.state[c_name],generic_name:val}
    })
    
}

zen_change = (e) =>{
    this.setState({[e.target.name]:e.target.value},()=>{console.log(this.state.zen)})

}

unit_change = (e) =>{
    const val = e.target.value
    const name_attrib = e.target.name
    const c_name = e.target.classList[0]
    this.setState({
        [c_name]: {...this.state[c_name],quantity_ordered:"",selected_unit:val,cost:"",total:0}
    })
    
}



quantity_change = (e) =>{
    const c_name = e.target.classList[0]
    if(this.state[c_name]["selected_unit"] === "SELECT" || this.state[c_name]["selected_unit"] === "" ){
        alert("Please input a selected_unit")
        return
    }
    let val = e.target.value
    if(this.state[c_name]["brand_description"]){
        let cost
        let val = e.target.value
        if(val <= 0){
            val = 0
        }
    
        const c_name = e.target.classList[0]
        if(this.state[c_name]["full_pack_quantity"] === 1 || this.state[c_name]["selected_unit"] === "FULL PACK"){
            cost = this.state[c_name]["raw_cost"]
    
        }
        else{
            const unit_quantity = parseInt(this.state[c_name]["unit_quantity"])
            if (typeof(unit_quantity) === "number"){
                const quant_ratio = this.state[c_name]["full_pack_quantity"]/unit_quantity
                cost = this.state[c_name]["raw_cost"]/quant_ratio
            }
            else{
                cost = this.state[c_name]["raw_cost"]/this.state[c_name]["full_pack_quantity"]
            }
        }
        const total = cost * parseInt(val)
        this.setState({
            [c_name]: {...this.state[c_name],quantity_ordered:val,cost:cost.toFixed(2),total:total.toFixed(2)}
        },()=>{
            
            // send order_product data to backend for save
            const item = this.state[c_name] 
          
            this.props.send_orderproduct(item["product_id"],
            item["generic_name"],
            item["brand_description"],
            item["selected_unit"],
            item["cost"],
            item["raw_cost"],
            item["quantity_ordered"],
            item["full_pack_quantity"],
            item["unit_quantity"],
            item["total"],
            c_name,this.props.last_orderid)  
             
            
            const id_list = this.state.id_list
            const current_no = parseInt(e.target.className)
            console.log(current_no,909)
            const last_tracked_id = parseInt(id_list[id_list.length-1])
            if(current_no === last_tracked_id){
               const new_latest = id_list[id_list.length-1]+1
               id_list.push(id_list[id_list.length-1]+1)
               console.log(123)
               this.setState({...this.state,
                   id_list,
                   [new_latest]:{
                    product_id:null,    
                   generic_name:"",
                   brand_description:"",
                   unit:"",
                   selected_unit:'',
                   raw_cost:"",
                   full_pack_quantity:"",
                   unit_quantity:"",
                   cost:"",
                   total:0,
                   quantity_ordered:""
                },
               })
            }

        })
    }
}


onModal = (e) =>{
    if(e.target.value){
        this.setState({"modal_generic":true},()=>{
            this.props.getGenProducts(e.target.value)
        })
    }
    
}

map_stuff = (num) =>{  
    num = String(num)
    const item = this.state[num] 
    return (
       
    <Fragment key={num}>
        <div className="product-div form-class">
          <input
               style={this.product_style}          
              className={num + ' ' + 'form-control'}
              type="text"
              name="brand_description"
              onChange={this.brand_change}
              value = {this.state[num]["brand_description"]}
          />
       
          <div style = {this.state.remove_list} className ="list-section" >
                {this.props.products[num]? this.props.products[num].map( (product,id)=>{
                    const input_length = this.state[num].brand_description.length
                    const brand_slice=product.brand_description.slice(0,input_length)
                    if(brand_slice.toLowerCase() === this.state[num].brand_description.toLowerCase() ){
                        return(
                    <div className="drugitem-cover" key={id}>
                        <div className='drugitem stretch' >
                            <div data-id = {id} data-prod = {product.brand_description} className={num} onClick = {this.onClickDrug}>{product.brand_description}</div>
                        </div>
                    </div>)
                    }
                }):null}
          </div> 
        </div>
        
        <div className="generic-div form-class">
            <input
                style = {this.generic_style}
                readOnly
                className={num + ' ' + 'form-control'}
                type="text"
                name="generic"
                onChange={this.generic_change}
                onClick={ this.onModal}
                value = {this.state[num]["generic_name"] || ''}
            />
        </div> 
        
       
        <div className="unit-div form-group">
            <select  className={num + ' '+  'form-control'} name="selected_unit" value={this.state[num]["selected_unit"] || ''} style = {this.unit_style} onChange = {this.unit_change}>
               <option value="SELECT">SELECT</option>
                {this.state[num]["full_pack_quantity"] === 1 ? 
                    <option value = {this.state[num]["unit"]}>{this.state[num]["unit"]}</option> :
                this.state[num]["full_pack_quantity"] > 1 ? 
                <Fragment>
                    <option value = {this.state[num]["unit"]}>
                        {this.state[num]["unit"] + " "} 
                        ({this.state[num]["unit_quantity"]})
                    </option> 

                    <option value ='FULL PACK'>
                        {"FULL PACK" + " "}
                    ({this.state[num]["full_pack_quantity"]})
                    </option>
                </Fragment> :null
                }
            </select>
        </div> 

        <div className="quantity-div form-group">
            <input
                className={num + ' ' + 'form-control'}
                type="number"
                name="quantity"
                onChange={this.quantity_change}  
                value = {this.state[num]["quantity_ordered"] ||''}
                style = {this.quantity_style}
            />
        </div> 

        <div className="cost-div form-group">
            <input
                readOnly
                className={num + ' ' + 'form-control'}
                type="number"
                name="cost"
                value = {this.state[num]["cost"] ||''}
                style = {this.cost_style}
            />
        </div> 

        <div className="total-div form-group" >
            <input
                style = {this.total_style}
                readOnly
                className={num + ' ' + 'form-control' + ' ' + 'total-input'}
                type="number"
                name="total"
                value = {this.state[num]["total"] ||''} 
            />
            {this.props.loading_serials[num] === true? <TailSpin
                    height="20"
                    width="20"
                    color="#4fa94d"
                    ariaLabel="tail-spin-loading"
                    radius="1"
                    wrapperStyle={{}}
                    wrapperClass="tailspin-class"
                    visible={true}
                /> : this.props.loading_serials[num] === false?
                <img src={Tick}/>
                :this.props.loading_serials[num] === "error"?
                <img src={Cross} onClick = {()=>(
                            
                    this.props.send_orderproduct(item["product_id"],
                    item["generic_name"],
                    item["brand_description"],
                    item["selected_unit"],
                    item["cost"],
                    item["raw_cost"],
                    item["quantity_ordered"],
                    item["full_pack_quantity"],
                    item["unit_quantity"],
                    item["total"],
                    num,this.props.last_orderid)  )
                }/> :null
                } 
               
            
        </div> 
        
    </Fragment>
         )

}

render(){

    const {id_list,...vals} = this.state

    let total = 0
    for (let id of id_list){
        total = parseFloat(total) + parseFloat(this.state[id]["total"])
    }
    total= total.toFixed(2)

 
    return (
        <Fragment>
            <div className="card" id="form-container-main">
                <div className="order_id">Order Id : {this.props.last_orderid? this.props.last_orderid:null}</div>
                <form className="form-class1">
                        <div id = "table-grid-main" >
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

            {vals["modal_generic"] === true? (<GenericModal
                show={this.state.modal_generic}
                onHide={()=>{
                    this.setState({"modal_generic":false})
                }}
            />) :null}
        </Fragment>
    )
}
}


const mapStateToProps = (state) => ({
    products : state.search.products,
    last_orderid:state.search.last_orderid,
    loi:state.search.loi,
    orderCreating:state.search.orderCreating,
    loading_serials:state.search.loading_serials
})
export default connect(mapStateToProps,{search_brand,get_last_order,send_orderproduct,getGenProducts})(Order)