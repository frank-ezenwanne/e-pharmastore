import React ,{Fragment,useState,useEffect} from "react"
import Modal from 'react-bootstrap/Modal';
import {connect} from 'react-redux'
// import Delay from 'react-delay-render'

function UpdateModal(props) {

    const [update_cost,setCostUpdate] = useState({cost:'',cost_list:[]})
    const [update_unit,setUnitUpdate] = useState({unit:'',unit_list:[]})
    const [update_unit_name,setUnitNameUpdate] = useState({unit_name:'',unit_name_list:[]})
    
 
    useEffect(()=>{
        if( Object.keys(props.updates.cost).length > 0 ){
            const id_list=[]
            const elem_obj ={}
            let id = 1
            for(let key_name of Object.keys(props.updates.cost)){
                id_list.push(id)
                elem_obj[id] = {brand_description:key_name,old_cost:props.updates.cost[key_name].old_cost,
                new_cost:props.updates.cost[key_name].new_cost, selected_unit:props.updates.cost[key_name].selected_unit
                    }
                id+=1
        }
        setCostUpdate({...update_cost,cost:elem_obj,cost_list:id_list})
    }      
},[props.updates.cost])

    useEffect(()=>{
        console.log('unit-enter')
        if(Object.keys(props.updates.unit).length > 0){
            const id_list=[]
            const elem_obj ={}
            let id = 1
            for(let key_name of Object.keys(props.updates.unit)){
                id_list.push(id)
                elem_obj[id] = {brand_description:key_name,message:props.updates.unit[key_name]}
                id+=1
            }
            setUnitUpdate({...update_unit,unit:elem_obj,unit_list:id_list})
        }
            
    },[props.updates.unit])

    useEffect(()=>{
        console.log('unit-name-enter')
        if( Object.keys(props.updates.unit_name).length > 0){
            const id_list=[]
            const elem_obj ={}
            let id = 1
            for(let key_name of Object.keys(props.updates.unit_name)){
                id_list.push(id)
                elem_obj[id] = {brand_description:key_name,message:props.updates.unit_name[key_name]}
                id+=1
            }
            setUnitNameUpdate({...update_unit_name,unit_name:elem_obj,unit_name_list:id_list})
        }   
        
    },[props.updates.unit_name])

   const map_price_updates =(id,count)=>{
      
       return(
        <div key ={count} className = 'price-update-grid'>
            <div>{update_cost['cost'][id]['brand_description']}</div>
            <div className = 'cost-unit-update-flex'>
                <div>Old Cost</div>
                <div style={{color:'#7dc244'}}>{"₦" + ' ' + update_cost['cost'][id]['old_cost']}</div>
                <div>per {update_cost['cost'][id]['selected_unit']}</div>
            </div>
            <div className = 'cost-unit-update-flex'>
                <div>New Cost</div> 
                <div style={{color:'green'}}>{"₦" + ' ' + update_cost['cost'][id]['new_cost']}</div>
                <div> per {update_cost['cost'][id]['selected_unit']}</div>
            </div>

            <div>{update_cost['cost'][id]['new_cost'] > update_cost['cost'][id]['old_cost'] ? 'Increased' :'Decreased'}</div>
        </div>
       ) 
   }

   const map_unit_updates =(id,count)=>{
    return(
     <div key ={count} className = 'unit-update-flex'>
         <div>{update_unit['unit'][id]['brand_description']}</div>
         <div>{update_unit['unit'][id]['message']}</div>
     </div>
    ) 
}

const map_unit_name_updates =(id,count)=>{
    return(
     <div key ={count} className = 'unit-update-flex'>
         <div>{update_unit_name['unit_name'][id]['brand_description']}</div>
         <div>{update_unit_name['unit_name'][id]['message']}</div>
     </div>
    ) 
}

  return (
    <Modal
      show = {props.show}
      onHide = {props.onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          <div style={{color:'green'}}>Updates</div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className = 'modal-update-body'>
            <Fragment>
            <div>
                {update_cost.cost &&
                    <div>
                        <h5>Price Updates</h5>
                        {update_cost.cost_list.map(map_price_updates)}     
                    </div>
                    }
            </div><br/>
               

            <div>
                {update_unit_name.unit_name &&
                        <div>
                            <h5>Unit Names</h5>
                            {update_unit_name.unit_name_list.map(map_unit_name_updates)}     
                        </div>
                }
            </div><br/>

            <div>
                {update_unit.unit &&
                        <div>
                            <h5>Unit Updates</h5>
                            {update_unit.unit_list.map(map_unit_updates)}     
                        </div>
                }
            </div><br/>

                
            </Fragment>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <div className = 'btn btn-success' onClick={props.onHide}>Close</div>
      </Modal.Footer>
    </Modal>
  );
}

const mapStateToProps = (state) => ({
    updates:state.search.updates
})

export default connect(mapStateToProps)(UpdateModal)
