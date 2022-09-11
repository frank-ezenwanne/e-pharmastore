import React, {Component,Fragment} from "react"
import {connect} from 'react-redux'
import {Navigate} from 'react-router-dom'
import {search_brand,get_last_order,send_orderproduct,getGenProducts,delete_order,
    delOrderProducts,clear_order_deleted_stat,clear_loiId,send_email} from "../actions/search"
import {TailSpin} from 'react-loader-spinner'
import Tick from '../../svg/tick.svg'
import Trash from '../../svg/trash.svg'
import GenericModal from './GenericModal/GenericModal'
import DeleteOrderModal from './DeleteOrderModal'
import SendOrderModal from './SendOrderModal'
import {clear_brand_desc} from '../actions/search'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

//.FIND OUT MEANING OF RENDER PURE FUNC ONLY

class Order extends Component{
    constructor(props){
        super(props);
        this.state = {
            id_list : [1],
            count_list:[1],
                1:{
                    id:'',
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
                    quantity_ordered:"",
                    checked_del:false,
                    extra_info:'',
                    saved:false
   
                }, 
            radio_search_option:'quick', 
            first_letter:'',
            group_letters:'',
            remove_list : {
                display:"none"},
            modal_generic:false,
            confirm_del_checkbox_display :{display:'none'},
            delete_button_color : 'btn-danger',
            delete_button_status : 'Remove items',
            modal_extrainfo:false,
            extra_info_num:'',
            modal_deleteorder:false,
            modal_sendorder:false
            }
    }

componentDidMount(){
    this.props.get_last_order()
}

componentDidUpdate(prevProps){
    let last_elem_serial
    let last_elem_count 
    let id_list = this.state.id_list
    let count_list = this.state.count_list
    const {loi,loading_serials,...rest} = this.props
        if (Object.keys(prevProps.loi).length !== Object.keys(loi).length){ //CHANGE LATER
             if(Object.keys(loi).length > 0){
                 id_list=[]
                 count_list =[]
                for (const id in loi){
                    id_list.push(id)
                    count_list.push(loi[id].count)
                }
                last_elem_serial = parseInt(id_list[id_list.length-1])
                last_elem_serial = last_elem_serial +1
                id_list.push(String(last_elem_serial))
                
                last_elem_count = parseInt(count_list[count_list.length-1])
                last_elem_count = last_elem_count +1
                count_list.push(String(last_elem_count))

             }  

            this.setState({...this.props.loi,id_list,count_list,[last_elem_serial]:{
                    id:'',
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
                    quantity_ordered:'',
                    brand_description_slug:'',
                    checked_del:false,
                    count:last_elem_count
            }
               
            })
        }

        if (prevProps.order_productid !== this.props.order_productid){
            const{current_serial,...rest} = this.props
            this.setState({...this.state,
                [current_serial] : {...this.state[current_serial],id:this.props.order_productid }
             })
        }

        if(this.props.order_deleted_move === true){
            this.props.clear_order_deleted_stat()//change the status of ready to move to customerpage to false after deleting order since deleting order changes it to true
            this.setState({...this.state,order_deleted_move:true})//change the state to true so that we can move to customer page
        }

        if (Object.keys(prevProps.loading_serials).length !== Object.keys(loading_serials).length){//CHANGE THIS TOO
            if(Object.keys(loading_serials).length > 0){
                const serial = Object.keys(loading_serials)[0]
                if(loading_serials[serial] === false){
                    this.setState({...this.state,[this.state[serial]]:{ ...this.state[serial],saved:true} })
                }
                
            }
        }
}


componentWillUnmount(){
    this.props.clear_loiId()
}


product_style={
    width:"100%",
    marginLeft:'0.6rem'

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
    let product
    if(this.state.radio_search_option === 'quick'){
        product = this.props.products[c_name][data_serial]}
    else{
        product = this.props.products_deep[c_name][data_serial]
    }
    
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
        group_letters:''
    })
}

brand_change=(e)=>{
    const val = e.target.value
    const name_attrib = e.target.name
    const c_name = e.target.classList[0]
    this.setState({...this.state,
        [c_name]: {...this.state[c_name],brand_description:val,
            brand_description_slug:'',
            product_id:null,
            generic_name:"",
            unit:"",
            selected_unit:'',
            raw_cost:"",
            full_pack_quantity:"",
            unit_quantity:"",
            cost:"",
            total:0,
            quantity_ordered:"",
            saved:false
        },
        remove_list:{display:"block"}
        
        },()=>{

            if(this.state.radio_search_option === 'deep'){
                const entry_txt = this.state[c_name][name_attrib].replace(/[^a-zA-Z0-9+&%] \s/g,'')
                const entry_txt_length = entry_txt.length
                if( entry_txt_length >= 2 ){
                    if(entry_txt.slice(0,2) !== this.state.group_letters){
                        this.setState({...this.state,group_letters : entry_txt.slice(0,2) })
                        
                        this.props.search_brand(entry_txt, this.state.radio_search_option,c_name)
                    }
                    
                }

                else if (entry_txt_length <= 2 ){
                    this.setState({...this.state,remove_list:{display:"none"} })
                }
             
            }

            else {
                if(this.state[c_name][name_attrib] ==="" || this.state[c_name][name_attrib][0] !== this.state.first_letter){
            
                    this.setState({...this.state,first_letter : val[0]})
                    if(val[0]){
                        this.props.search_brand(val[0],this.state.radio_search_option,c_name)
                   } 
                    else{
                    this.setState({...this.state,remove_list:{display:"none"} })
                   }
                
                 }
            }



    } //end of callback
       
)


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


unit_change = (e) =>{
    const val = e.target.value
    const name_attrib = e.target.name
    const c_name = e.target.classList[0]
    this.setState({
        [c_name]: {...this.state[c_name],quantity_ordered:"",selected_unit:val,cost:"",total:0,saved:false}
    })
    
}

onExtraInfoModelSubmit=(e)=>{
    const serial = this.state['extra_info_num']
    this.setState({...this.state,"modal_extrainfo":false,'extra_info_num':''})
    if(serial && this.state[serial].extra_info && this.state[serial].cost){
        const item = this.state[serial]
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
            item['extra_info'],
            serial,this.props.last_orderid)
    }
}

onExtraInfoModelHide =(e)=>{
    this.setState({...this.state,"modal_extrainfo":false,'extra_info_num':''})
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
    
        
        if(this.state[c_name]["full_pack_quantity"] === 1 || this.state[c_name]["selected_unit"] === "FULL PACK"){
            cost = this.state[c_name]["raw_cost"]
    
        }
        else{
            const check_no = Number(this.state[c_name]["unit_quantity"])
            let unit_quantity = this.state[c_name]["unit_quantity"]
            if (check_no){   
                const quant_ratio = this.state[c_name]["full_pack_quantity"]/unit_quantity
                cost = this.state[c_name]["raw_cost"]/quant_ratio
            }
            else{
                cost = this.state[c_name]["raw_cost"]/this.state[c_name]["full_pack_quantity"]
                
            }
        }
        const total = cost * parseInt(val)
        this.setState({
            [c_name]: {...this.state[c_name],quantity_ordered:val,cost:cost.toFixed(2),total:total.toFixed(2),saved:false}
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
            item['extra_info'],
            c_name,this.props.last_orderid)  
             
            
            const id_list = this.state.id_list
            const current_no = parseInt(e.target.className)
            const last_tracked_id = parseInt(id_list[id_list.length-1])
            if(current_no === last_tracked_id){
                const count_list = this.state.count_list
                const last_tracked_count = parseInt(count_list[count_list.length-1])
                const new_latest_count = last_tracked_count +1 
                count_list.push(new_latest_count)

                const new_latest_serial = last_tracked_id+1
                id_list.push(new_latest_serial)
                this.setState({...this.state,
                   count_list,
                   id_list,
                   [new_latest_serial]:{
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
                   quantity_ordered:"",
                   saved:false,
                   count:new_latest_count
                },
               })
            }

        })
    }
}


onModal = (e) =>{
    if(e.target.value){
        this.setState({...this.state,"modal_generic":true},()=>{
            this.props.getGenProducts(e.target.value)
        })
    }
    
}

onChangeRadioSearch = (e) =>{
    this.setState({...this.state,'radio_search_option':e.target.value,group_letters:'',first_letter:''}),
    ()=>{
        this.props.clear_brand_desc()}
}

OnChangeCheckBox = (e)=>{
    const c_name = e.target.classList[0]
    if(this.state[c_name].checked_del === true ){
        this.setState({...this.state,[c_name]:{
            ...this.state[c_name],checked_del:false
        }})
    }
    else{
        this.setState({...this.state,[c_name]:{
            ...this.state[c_name],checked_del:true
        }})
    }
}


confirmDeleterow = (e) =>{
    const all_checked=[]
    const posted=[]
    for(const id of this.state.id_list){
        if(this.state[id].checked_del && this.state[id].id){
            posted.push(parseInt(this.state[id].id))
        }
        if (this.state[id].checked_del){
            all_checked.push(id)
        }
    }

    if (all_checked.length === 0){
        alert('no box was selected!!')
    }

    else if (all_checked.length > 0 || posted.length > 0){
        if (confirm('E-Pharmastore:\nAre you sure you want to delete the selected item(s)?')){    
            let id_list = [...this.state.id_list]
            // let count_list = [...this.state.count_list]
            if (all_checked.length > 0){  
                let new_state = {...this.state}
                let idlist_index
                // let countlist_index
                all_checked.forEach((elem)=>{//loop begins
                    idlist_index = id_list.indexOf(elem)
                    if(idlist_index !== -1){ //if the state index in id_list is present in all_checked i.e has been checked
                        // const count_to_del = new_state[elem].count //quickly 1st get corresponding count
                        // countlist_index = count_list.indexOf(count_to_del)//get the index of the count in count_list
                        // if(countlist_index !== -1){
                        //     count_list.splice(countlist_index,1)//use the index to remove the element
                        // }
                        id_list.splice(idlist_index,1)//now..removing the actual serialand data..splice will delete the checked elem from id_list
                        delete new_state[elem]
                    }   
                })//loop ends
                
                    let count_list = []
                    let i = 0
                    for(let serial_elem of id_list){
                        i+=1
                        new_state[serial_elem].count = i
                        count_list.push(i)
                   
                    }
                    
                    this.setState({...this.state,id_list,count_list})

                }
            

            if (posted.length > 0){
                this.props.delOrderProducts(this.props.last_orderid,posted)
            }

        }
    }
}

changeDeleteStatus = (e) =>{
    if(this.state.delete_button_status !== 'Cancel'){
        this.setState({
            ...this.state, confirm_del_checkbox_display:{display:'inline-block'},
            delete_button_color:'btn-warning',delete_button_status : 'Cancel'
        })
    }
    else{
        this.setState({
            ...this.state, confirm_del_checkbox_display:{display:'none'},
            delete_button_color:'btn-danger',delete_button_status : 'Remove items'
        })
    }

}

clickExtraInfo = (e) =>{
    const c_name = e.target.classList[0]
    if(this.state[c_name]['product_id']){
        this.setState({...this.state,modal_extrainfo:true,extra_info_num:c_name})
    }
    
}

confirm_order=()=>{
    let error_ids = []
    let strn =''
    for(let id of this.state.id_list){
        if (this.state[id].saved ===false){
            error_ids.push(this.state[id].count)
            strn+=`${this.state[id].count} ,`
        }
    }
    if (error_ids.length > 0){
        
        alert(`Resolve ids ${strn}` )
    }
    else {
        this.setState({"modal_sendorder":true})
    }
}


map_stuff = (num) =>{  
    num = String(num)
    const item = this.state[num] 
    return (
       
    <Fragment key={num}>
        <div className="product-div form-class">
        <span className='brand-minus-section'>
            {this.state[num].brand_description?this.state[num].id? 
                 <input onChange = {this.OnChangeCheckBox} 
                    checked ={this.state[num]['checked_del'] || ''} 
                    style = {this.state.confirm_del_checkbox_display}
                    className = {num + ' ' +'checkbox-elem'} 
                    type='checkbox' 
                    name = 'delete-row'
                    value={num} />:null:null
            }

            <div className="count">{this.state[num]['count']}</div>
           
            <input
                style={this.product_style}          
                className={num + ' ' + 'form-control'}
                type="text"
                name="brand_description"
                onChange={this.brand_change}
                value = {this.state[num]["brand_description"]}
            />
            <div style = {{border:(this.state[num]['extra_info']? '0.134rem solid green': '0.134rem solid orange' )}} onClick={this.clickExtraInfo} className={num + ' ' + 'btn' + ' ' +  'extra-info-section'}>Ex</div>
          </span>
       
          <div style = {this.state.remove_list} className ="list-section" >
          {this.state.radio_search_option === 'quick'? //if radio is quick
                this.props.products[num]? this.props.products[num].map( (product,id)=>{ //if quick,check if products is in props
                    const input_length = this.state[num].brand_description.length
                    {/* const bds = product.brand_description.replace(/[^a-zA-Z0-9+&%]\s/g,'') */}
                    const brand_slice=product.brand_description_slug.slice(0,input_length) //coming from the backend..but decided to make cleanng on d fly with bds var
                    {/* const brand_slice =bds.slice(0,input_length) */}
                    const brand_slice_raw =product.brand_description.slice(0,input_length)
                    const entry = this.state[num].brand_description.replace(/[^a-zA-Z0-9+&%]\s/g,'')
                    if(brand_slice.toLowerCase() === entry.toLowerCase() || brand_slice_raw.toLowerCase() === this.state[num].brand_description.toLowerCase() ){

                        return(
                    <div className="drugitem-cover" key={id}>
                        <div className='drugitem stretch' >
                            <div data-id = {id} data-prod = {product.brand_description} className={num} onClick = {this.onClickDrug}>{product.brand_description}</div>
                        </div>
                    </div>)
                    }
                }):null // this null ends the products? as an else component expression so that notn is displayed
                :this.state.radio_search_option === 'deep'?//this links up as the else option for if radio=quick
                this.props.products_deep[num]? this.props.products_deep[num].map((product,id)=>{
                    const input = this.state[num].brand_description.toLowerCase().replace(/[^a-zA-Z0-9+&%]\s/g,'')
                    {/* const bds = product.brand_description.replace(/[^a-zA-Z0-9+&%]\s/g,'') */}
                    const input_raw = this.state[num].brand_description.toLowerCase()
                    const str_point = product.brand_description_slug.indexOf(input)
                    const str_point_raw = product.brand_description.toLowerCase().indexOf(input_raw)
                    const brand_slice=product.brand_description_slug.slice(str_point,(str_point+input.length))
                    const brand_slice_raw =product.brand_description.slice(str_point_raw,(str_point_raw+input_raw.length))
                 

                    if(brand_slice === input || brand_slice_raw.toLowerCase() === input_raw ){
                        return(
                            <div className="drugitem-cover" key={id}>
                                <div className='drugitem stretch' >
                            <div data-id = {id} data-prod = {product.brand_description} className={num} onClick = {this.onClickDrug}>{product.brand_description}</div>
                        </div>
                    </div>)}
                }
            ) :null :null //the 1st null ends the inner if expression, the 2nd one ends the outer one i.e if radio = deep
            
            }    
                
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
                <img className = 'svg-tick-error-class' src={Tick}/>
                :this.props.loading_serials[num] === "error"? 
                (<div className = 'svg-tick-error-class' onClick = {()=>{
                    this.props.send_orderproduct( item["product_id"],
                    item["generic_name"],item["brand_description"],
                    item["selected_unit"], item["cost"],
                    item["raw_cost"],item["quantity_ordered"],
                    item["full_pack_quantity"],item["unit_quantity"],
                    item["total"],item['extra_info'],
                    num,this.props.last_orderid)  }}>  {/* end of sendop func*/}
                                                         
                    {/* start div content */}
                    <svg xmlns="http://www.w3.org/2000/svg"  fill="red" width="100%" height="100%" viewBox="0 0 24 24"><path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6 16.094l-4.157-4.104 4.1-4.141-1.849-1.849-4.105 4.159-4.156-4.102-1.833 1.834 4.161 4.12-4.104 4.157 1.834 1.832 4.118-4.159 4.143 4.102 1.848-1.849z"/></svg>
                    {/* end */}

                </div>) :null
             }    {/* end of loading serials/svg section */}
               
            
        </div> 
        
    </Fragment>
         )

}

render(){
    if(this.state.order_deleted_move){
        return <Navigate to = "/customerpage"/>
    }
    if(this.state.id_list.length === 0){
        this.setState({
            id_list : [1],
                1:{
                    id:'',
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
                    quantity_ordered:"",
                    checked_del:false,
                    saved:false
                
                }, 
            radio_search_option:'quick', 
            first_letter:'',
            group_letters:'',
            remove_list : {
                display:"none"},
            modal_generic:false,
            confirm_del_checkbox_display :{display:'none'},
            delete_button_color : 'btn-danger',
            delete_button_status : 'Remove items'
            })
    }
    const {id_list,...vals} = this.state

    let total = 0
    for (let id of id_list){
        total = parseFloat(total) + parseFloat(this.state[id]["total"])
    }
    total= total.toFixed(2)
    total =total.toLocaleString('en-US',{style:'currency',currency:'USD'})
   
 
    return (
        <Fragment>
            <div className="card" id="form-container-main">
                <div className='header'>
                    <div className="order_id">Order Id : {this.props.last_orderid? this.props.last_orderid:null}</div>
                    <div  className = 'radio-delete-div'>
                        <div className = 'radio-search-option-div'>
                            <div className = 'radio-input form-check'> Quick search<input className= 'form-check-input' onChange = {this.onChangeRadioSearch} checked ={this.state.radio_search_option === 'quick' } type ='radio' value='quick' name="radio_search_option"></input></div>
                            <div className = 'radio-input form-check'> Deep search<input className = 'form-check-input' onChange = {this.onChangeRadioSearch} checked ={this.state.radio_search_option === 'deep' } type ='radio' value='deep' name="radio_search_option"></input></div>
                        </div>
                        <div className = 'delete-options-div'>
                            <div onClick = {this.confirmDeleterow} style = {this.state.confirm_del_checkbox_display} className = 'btn btn-danger confirm-delete'>Confirm</div>
                            <div onClick = {this.changeDeleteStatus} className = {'btn' +' ' + this.state.delete_button_color + ' ' +'delete-cancel'}> {this.state.delete_button_status} </div>
                            <div onClick = {()=>{this.setState({"modal_deleteorder":true}) }}
                                 className = 'delete-order-button btn'>
                                <div className = 'delete-svg'>
                                    <svg fill ='red' width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd"><path d="M19 24h-14c-1.104 0-2-.896-2-2v-16h18v16c0 1.104-.896 2-2 2zm-7-10.414l3.293-3.293 1.414 1.414-3.293 3.293 3.293 3.293-1.414 1.414-3.293-3.293-3.293 3.293-1.414-1.414 3.293-3.293-3.293-3.293 1.414-1.414 3.293 3.293zm10-8.586h-20v-2h6v-1.5c0-.827.673-1.5 1.5-1.5h5c.825 0 1.5.671 1.5 1.5v1.5h6v2zm-8-3h-4v1h4v-1z"/></svg>
                                </div>
                                <div className='order-delete-text'>Order</div>
                            </div>


                        </div>
                    
                    </div>
                </div>
 
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
                        
                </form>
            </div>
            {/* this.props.send_email(this.props.last_orderid */}
            <div className="send-order-total-div">
                 <div onClick = {()=>{this.confirm_order()}}
                      className = 'send-order-button btn btn-success'>
                   Send Order
                 </div>

                 <div className="total-cost">
                             {"₦" + ' ' + total}
                 </div>

            </div>
            
            {vals["modal_generic"] === true? (<GenericModal
                show={this.state.modal_generic}
                onHide={()=>{
                    this.setState({"modal_generic":false})
                }}
            />) :null}

            {vals["modal_extrainfo"] === true?vals[vals['extra_info_num']]['product_id'] !== ''?
                   ( <Modal
                show = {this.state.modal_extrainfo}
                onHide = {this.onExtraInfoModelHide}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                dialogClassName = 'mod'
                >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                    <div style={{color:'green'}}> {this.state[ this.state['extra_info_num'] ].brand_description}</div>
                        <span style ={{fontSize:'90%'}}>Any extra detail(Optional) </span>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Fragment>
                    <div className = 'extrainfo-input-div'>
                         <div>Extra Description:</div>
                         <textarea className = 'modal-extrainfo-class' onChange={(e)=>{
                             const serial = this.state['extra_info_num']
                             this.setState({...this.state, [serial]: {...this.state[serial],extra_info:e.target.value }})
                         }} value ={this.state[ this.state['extra_info_num'] ].extra_info || ''} ></textarea>
                    </div>
                  <div style={{marginLeft:'15rem',marginTop:'0.5rem'}} onClick = {this.onExtraInfoModelSubmit} className = 'btn btn-success'>Submit and Close</div>
                </Fragment>
                </Modal.Body>
                <Modal.Footer>
                    {/* <Button onClick={props.onHide}>Close</Button> */}
                </Modal.Footer>
                </Modal>)  :null  :null   }
            
            {
               vals['modal_deleteorder']?(<DeleteOrderModal
                   show={this.state.modal_deleteorder}
                   last_orderid ={this.props.last_orderid}
                   onHide={()=>{
                    this.setState({"modal_deleteorder":false})
                         }}
                   id = {this.props.last_orderid}
                   delete_order = {()=>{
                       this.props.delete_order(this.props.last_orderid)
                   }}
               />):null
            }

            {
               vals['modal_sendorder']?(<SendOrderModal
                   show={this.state.modal_sendorder}
                   last_orderid ={this.props.last_orderid}
                   onHide={()=>{
                    this.setState({"modal_sendorder":false})
                         }}
                   send_email_code = {()=>{
                        this.setState({"modal_sendorder":false},()=>{
                            this.props.send_email(this.props.last_orderid)
                        })
                       
                   }}
               />):null
            }
            
        </Fragment>
    )
 }//end of render method
}//end of class component


const mapStateToProps = (state) => ({
    products : state.search.products,
    products_deep: state.search.products_deep,
    last_orderid:state.search.last_orderid,
    loi:state.search.loi,
    orderCreating:state.search.orderCreating,
    loading_serials:state.search.loading_serials,
    order_productid:state.search.order_productid,
    current_serial:state.search.current_serial,
    order_deleted_move:state.search.order_deleted_move
})

const redux_funcs = {
    search_brand,clear_brand_desc,
    get_last_order,send_orderproduct,
    clear_loiId,clear_order_deleted_stat,getGenProducts,delOrderProducts,delete_order,send_email
}
export default connect(mapStateToProps,redux_funcs)(Order)