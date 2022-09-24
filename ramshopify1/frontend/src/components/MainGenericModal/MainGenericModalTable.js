import React ,{Fragment,useState,useEffect} from "react"
import {connect} from 'react-redux'
import {clear_gen_products,getGenProducts,search_generic_names} from '../../actions/search'



function MainGenericModalTable(props) {

const [products,setProducts] = useState({ "1":{
                
    product_id:'',
    brand_description:'',
    unit:'',
    selected_unit:'',
    raw_cost:'',
    full_pack_quantity:'',
    unit_quantity:0,
    cost:0},
    id_list:[],
    productid_list:[]
  }
    )

const [generic_collection, setGeneric] = useState({
    first_letter_generic:'',
    generic_selection:props.generic_name_prop,
    remove_list:{display:"none"}
})

useEffect(()=>{
  setGeneric({...generic_collection,generic_selection:props.generic_name_prop})
},[props.generic_name_prop])

const [addbutton,setAddButtonCheck] = useState({
  add_btn_state:'Add to Order',
  add_btn_colour:'btn-success',
  confirm_add_checkbox_display:'none',
})

const onClickAddButton = ()=>{
  if(addbutton.add_btn_state === 'Add to Order'){
    setAddButtonCheck({...addbutton,add_btn_state:'Cancel',add_btn_colour:'btn-warning',
    confirm_add_checkbox_display:'inline-block'})
  }
  else{
    setAddButtonCheck({...addbutton,add_btn_state:'Add to Order',add_btn_colour:'btn-success',
    confirm_add_checkbox_display:'none'})
  }
}

const onChangeGeneric=(e)=>{
  setGeneric({...generic_collection,generic_selection:e.target.value, remove_list:{display:"block"}},)
}

useEffect(
  ()=>{
    const input_first_let = generic_collection.generic_selection[0]
    if(generic_collection.generic_selection ==="" || input_first_let !== generic_collection.first_letter_generic){
              
      setGeneric({...generic_collection,first_letter_generic : input_first_let})
  
      if(input_first_let){
          props.search_generic_names(input_first_let)
        } 
      else{
        setGeneric({...generic_collection,remove_list:{display:"none"} })
        }
    }
  
  },[generic_collection.generic_selection]
)


useEffect(
  ()=>{
    console.log(props.productid_list,9098)
    let id_list = []
    let counter = 0
    let obj = {}
    if(props.generic_products){
        for(const id in props.generic_products){
            if(props.productid_list.indexOf(props.generic_products[id].id) !== -1 ){
              props.generic_products[id].in_cart = true
               }
            else{
              props.generic_products[id].in_cart = false
            }

            id_list.push(props.generic_products[id].id)//gets a serial no list for generic products
            if(props.generic_products[id].full_pack_quantity === 1){
              props.generic_products[id].selected_unit = props.generic_products[id].unit
              props.generic_products[id].cost = props.generic_products[id].raw_cost
            }
            else{
              if(props.generic_products[id].full_pack_quantity > 1){
                props.generic_products[id].selected_unit = "FULL PACK"
                props.generic_products[id].cost = props.generic_products[id].raw_cost
              }
            }
            obj[props.generic_products[id].id] = props.generic_products[id]
        }//copied into obj because of async setProducts i.e return will clear products before setProducts can finish
        
        setProducts({
          ...products,
          ...obj,
          id_list
        })
    }
    return () => {
      props.clear_gen_products()
    }
  },[props.generic_products]

) //end of generic_products useEffect





const generic_style ={
  width:'16rem'
}

const product_style={
  width:"100%"
}

const unit_style = {
  width:"100%",
  
}

const cost_style ={
  width:"100%"
}

const onClickGeneric = (e)=>{
  const generic_selection = e.target.getAttribute('data-generic')
  setGeneric({...generic_collection,generic_selection:generic_selection,remove_list:{display:"none"}})
  props.getGenProducts(generic_selection)
}

const OnChangeCheckBox = (e)=>{
      const c_name = e.target.classList[0]
      if(products[c_name].checked_del === true ){
        setProducts({...products,[c_name]:{
              ...products[c_name],checked_del:false
          }})
      }
      else{
        setProducts({...products,[c_name]:{
              ...products[c_name],checked_del:true
          }})
      }
}

const unit_change = (e) =>{
    const val = e.target.value
    const c_name = e.target.className[0]
    if(val === "SELECT"){
      setProducts({...products,
        [c_name]: {...products[c_name],selected_unit:val,cost:null}
      })
    }
    else{
        const name_attrib = e.target.name
        const c_name = e.target.classList[0]
        let cost =0
        if(products[c_name]["full_pack_quantity"] === 1 || val === "FULL PACK"){
          cost = products[c_name]["raw_cost"]
         
      }
          
      
        else{
          const check_no = Number(products[c_name]["unit_quantity"])
            let unit_quantity = products[c_name]["unit_quantity"]
            if (check_no){   
                const quant_ratio = products[c_name]["full_pack_quantity"]/unit_quantity
                cost = products[c_name]["raw_cost"]/quant_ratio
            }
            else{
                  cost = products[c_name]["raw_cost"]/products[c_name]["full_pack_quantity"]
                }
         }
          setProducts({...products,
            [c_name]: {...products[c_name],selected_unit:val,cost:cost.toFixed(2)}//sets generic_products in the state
           })
    }
 }




    const map_stuff = (num) =>{  
      num = String(num)
      return (
         
      <Fragment key={num}>
          <div className="product-div form-class">
            <div className="brand-add-section">
            {!products[num].in_cart?
              <input onChange = {OnChangeCheckBox} 
                checked ={products[num]['checked_del'] || ''} 
                style = {{display:addbutton.confirm_add_checkbox_display,marginRight:'0.3rem'}}
                className = {num + ' ' +'checkbox-elem-generic'} 
                type='checkbox' 
                name = 'add-row'
                value={num} />:null }
              
              <input
                  disabled
                  style={product_style}          
                  className={num + ' ' + 'form-control'}
                  type="text"
                  name="brand_description"
                  value = {products[num]["brand_description"]}
              />
            </div>
         
          </div>
        
         
          <div className="unit-div-generic form-group">
              <select  className={num + ' '+  'form-control'} name="selected_unit" value={products[num]["selected_unit"] || ''} style = {unit_style} onChange = {unit_change}>
                 {/* <option value="SELECT">SELECT</option> */}
                  {products[num]["full_pack_quantity"] === 1 ? 
                      <option value = {products[num]["unit"]}>{products[num]["unit"]}</option> :
                  products[num]["full_pack_quantity"] > 1 ? 
                  <Fragment>

                      <option value ='FULL PACK'>
                          {"FULL PACK" + " "}
                      ({products[num]["full_pack_quantity"]})
                      </option>
                      
                      <option value = {products[num]["unit"]}>
                          {products[num]["unit"] + " "} 
                          ({products[num]["unit_quantity"]})
                      </option> 
  
                      
                  </Fragment> :null
                  }
              </select>
          </div> 

          <div className="cost-div-generic form-group">
            <input
                readOnly
                className={num + ' ' + 'form-control'}
                type="number"
                name="cost"
                value = {products[num]["cost"] ||''}
                style = {cost_style}
            />
        </div> 
    </Fragment>)}

  return(
    <Fragment>
      <div className = 'main-generic-input-button-div'>
        <div className="main-generic-input-div form-class">
            <span>Generic Name: </span>
            <input
                style={generic_style}          
                className='form-control'
                type="text"
                name="generic_selection"
                onChange = {onChangeGeneric}
                value = {generic_collection.generic_selection || ''}
            />
            <div style = {generic_collection.remove_list} className ="generic-list-section" >
                {props.generic_name_options? props.generic_name_options.map( (generic,id)=>{ //if quick,check if products is in props
                    const input_length = generic_collection.generic_selection.length
                    const generic_slice=generic.generic_name.slice(0,input_length) //coming from the backend..but decided to make cleanng on d fly with bds var
                    {/* const brand_slice =bds.slice(0,input_length) */}
                    {/* const brand_slice_raw =product.brand_description.slice(0,input_length) */}
                    const entry = generic_collection.generic_selection
                    {/* const entry = this.state[num].brand_description.replace(/[^a-zA-Z0-9+&%]\s/g,'') */}
                    {/* if(generic_slice.toLowerCase() === entry.toLowerCase() || brand_slice_raw.toLowerCase() === this.state[num].brand_description.toLowerCase() ){ */}
                    if(generic_slice.toLowerCase() === generic_collection.generic_selection.toLowerCase()){
                        return(
                    <div className="drugitem-cover" key={id}>
                        <div align ='left' className='drugitem stretch' >
                            <div data-id = {id} data-generic = {generic.generic_name} onClick = {onClickGeneric}>{generic.generic_name.toUpperCase()}</div>
                        </div>
                    </div>)
                }}):null}
            </div>
          </div>
          <div className='add-confirm-button-div'>
            <div style ={{display:addbutton.confirm_add_checkbox_display,marginRight:'0.5rem'}} className="btn btn-success">Confirm</div>
            <div onClick = {onClickAddButton} className={"btn" + ' ' + addbutton.add_btn_colour}>{addbutton.add_btn_state}</div>
          </div>
        </div> 

      <div id="form-container-generic">
          <form className="form-class1-generic">
                  <div id = "table-grid-generic" >
                          <div className="grid-headings">Product</div>
                          <div className="grid-headings">Unit</div>
                          <div className="grid-headings">Unit Cost</div>
                      {products.id_list.map(map_stuff)}
                  </div>
            
          </form>
      </div>

  </Fragment>
    )}

const mapStateToProps=(state)=>({
  generic_products : state.search.generic_products,
  generic_name_options:state.search.generic_name_options,
  generic_name_prop:state.search.generic_name_prop,
})

const redux_funcs ={
  clear_gen_products,search_generic_names,getGenProducts
}

export default connect(mapStateToProps,redux_funcs)(MainGenericModalTable)
  