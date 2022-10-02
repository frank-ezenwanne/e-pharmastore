import React ,{Fragment,useState,useEffect} from "react"
import Modal from 'react-bootstrap/Modal';
import {connect} from 'react-redux'
// import Delay from 'react-delay-render'

function UpdateModal(props) {

    const [updates,setUpdates] = useState({cost:'',unit:'',unit_name:'',cost_list:[],unit_list:[],unit_name_list:[]})
    
 
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
        setUpdates({...updates,cost:elem_obj,cost_list:id_list})
    }      
},[props.updates])

    useEffect(()=>{
        if(Object.keys(props.updates.unit).length > 0){
            const id_list=[]
            const elem_obj ={}
            let id = 1
            for(let key_name of Object.keys(props.updates.unit)){
                id_list.push(id)
                elem_obj[id] = {brand_description:key_name,message:props.updates.unit[key_name]}
                id+=1
            }
            setUpdates({...updates,unit:elem_obj,unit_list:id_list})
        }
            
    },[props.updates])

    useEffect(()=>{
        if( Object.keys(props.updates.unit_name).length > 0){
            const id_list=[]
            const elem_obj ={}
            let id = 1
            for(let key_name of Object.keys(props.updates.unit_name)){
                id_list.push(id)
                elem_obj[id] = {brand_description:key_name,message:props.updates.unit_name[key_name]}
                id+=1
            }
            setUpdates({...updates,unit_name:elem_obj,unit_name_list:id_list})
        }   
        
    },[props.updates])

   const map_price_updates =(id,count)=>{
      
       return(
        <div key ={count} className = 'price-update-grid'>
            <div>{updates['cost'][id]['brand_description']}</div>
            <div className = 'cost-unit-update-flex'>
                <div>Old Cost</div>
                <div style={{color:'#7dc244'}}>{"₦" + ' ' + updates['cost'][id]['old_cost']}</div>
                <div>per {updates['cost'][id]['selected_unit']}</div>
            </div>
            <div className = 'cost-unit-update-flex'>
                <div>New Cost</div> 
                <div style={{color:'green'}}>{"₦" + ' ' + updates['cost'][id]['new_cost']}</div>
                <div> per {updates['cost'][id]['selected_unit']}</div>
            </div>

            <div>{updates['cost'][id]['new_cost'] > updates['cost'][id]['old_cost'] ? 'Increased' :'Decreased'}</div>
        </div>
       ) 
   }

   const map_unit_updates =(data,id)=>{
    return(
     <div className = 'unit-update-flex'>
         <div>{updates['unit'][id]['brand_description']}</div>
         <div>{updates['unit'][id]['message']}</div>
     </div>
    ) 
}

const map_unit_name_updates =(data,id)=>{
    return(
     <div className = 'unit-update-flex'>
         <div>{updates['unit_name'][id]['brand_description']}</div>
         <div>{updates['unit_name'][id]['message']}</div>
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
                {updates.cost &&
                        <div>
                            <h3>Price Updates</h3>
                            {updates.cost_list.map(map_price_updates)}     
                        </div>
                }

                {updates.unit &&
                        <div>
                            <h3>Unit Updates</h3>
                            {updates.unit_list.map(map_unit_updates)}     
                        </div>
                }

                {updates.unit_name &&
                        <div>
                            <h3>Unit Names</h3>
                            {updates.unit_name_list.map(map_unit_name_updates)}     
                        </div>
                }
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
