import React ,{Fragment,useState,useEffect} from "react"
import {connect} from 'react-redux'

function GenericModalTable(props) {

const [products,setProducts] = useState({ "1":{
                
    product_id:'',
    brand_description:'',
    unit:'',
    selected_unit:'',
    raw_cost:'',
    full_pack_quantity:'',
    unit_quantity:0,
    cost:0},
    id_list:[]
  }
    )

useEffect(
  ()=>{
    console.log(props.generic_products)
    let id_list = []
    let counter = 0
    let obj = {}
    if(props.generic_products){
        for(const id in props.generic_products){
            id_list.push(props.generic_products[id].id)
            if(props.generic_products[id].full_pack_quantity === 1){
              props.generic_products[id].selected_unit = props.generic_products[id].unit
              props.generic_products[id].cost = props.generic_products[id].cost
            }
            else{
              if(props.generic_products[id].full_pack_quantity > 1){
                props.generic_products[id].selected_unit = "FULL PACK"
                props.generic_products[id].cost = props.generic_products[id].cost
              }
            }
            obj[props.generic_products[id].id] = props.generic_products[id]
        }
        console.log(obj)
        
        setProducts({
          ...products,
          ...obj,
          id_list
        })
    }
  },[props.generic_products]
)

const product_style={
  width:"100%"
}

const unit_style = {
  width:"100%",
  
}

const cost_style ={
  width:"100%"
}


const unit_change = (e) =>{
    const val = e.target.value
    const c_name = e.target.className[0]
    if(val === "SELECT"){
      setProducts({...products,
        [c_name]: {...products[c_name],selected_unit:val,cost:null}
    }
    )}
    else{
        
        const name_attrib = e.target.name
        const c_name = e.target.classList[0]
        let cost =0
        if(products[c_name]["full_pack_quantity"] === 1 || val === "FULL PACK"){
          cost = products[c_name]["raw_cost"]
          setProducts({...products,
            [c_name]: {...products[c_name],selected_unit:val,cost:cost.toFixed(2)}
        })
      }
          
      
        else{
          const unit_quantity = parseInt(products[c_name]["unit_quantity"])
          if (typeof(unit_quantity) === "number"){
              const quant_ratio = products[c_name]["full_pack_quantity"]/unit_quantity
              cost = products[c_name]["raw_cost"]/quant_ratio
          }
          else{
              cost = products[c_name]["raw_cost"]/products[c_name]["full_pack_quantity"]
          }
          setProducts({...products,
            [c_name]: {...products[c_name],selected_unit:val,cost:cost.toFixed(2)}
        })
      }
      }
 
   }




    const map_stuff = (num) =>{  
      num = String(num)
      return (
         
      <Fragment key={num}>
          <div className="product-div form-class">
            <input
                disabled
                style={product_style}          
                className={num + ' ' + 'form-control'}
                type="text"
                name="brand_description"
                value = {products[num]["brand_description"]}
            />
         
          </div>
        
         
          <div className="unit-div-generic form-group">
              <select  className={num + ' '+  'form-control'} name="selected_unit" value={products[num]["selected_unit"] || ''} style = {unit_style} onChange = {unit_change}>
                 {/* <option value="SELECT">SELECT</option> */}
                  {products[num]["full_pack_quantity"] === 1 ? 
                      <option value = {products[num]["selected_unit"]}>{products[num]["unit"]}</option> :
                  products[num]["full_pack_quantity"] > 1 ? 
                  <Fragment>

                      <option value ='FULL PACK'>
                          {"FULL PACK" + " "}
                      ({products[num]["full_pack_quantity"]})
                      </option>
                      
                      <option value = {products[num]["selected_unit"]}>
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
      <div id="form-container-generic">

          <form className="form-class1">
                  <div id = "table-grid-generic" >
                          <div className="grid-headings">pro</div>
                          <div className="grid-headings">Unit</div>
                          <div className="grid-headings">Unit c</div>
                      {products.id_list.map(map_stuff)}
                  </div>
            
          </form>
      </div>

  </Fragment>
    )}

const mapStateToProps=(state)=>({
  generic_products : state.search.generic_products
})

export default connect(mapStateToProps)(GenericModalTable)
  