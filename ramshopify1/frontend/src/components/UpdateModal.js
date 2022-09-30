import React ,{Fragment,useState,useEffect} from "react"
import Modal from 'react-bootstrap/Modal';

function UpdateModal(props) {

    const [updates,setUpdates] = useState({cost:'',unit:'',unit_name:'',cost_list:[],unit_list:[],unit_name_list:[]})
    
 
    useEffect(()=>{
        if(props.updates.cost){
            const id_list=[]
            const elem_obj ={}
            let id = 1
            for(key_name of Object.keys(props.updates.cost)){
                id_list.push(id)
                elem_obj[id] = {brand_description:key_name,old_cost:props.updates.cost['key_name'].old_cost,
                new_cost:props.updates.cost['key_name'].new_cost
            }
        }
        setUpdates({...updates,cost:elem_obj,cost_list:id_list})
    }      
},[props.updates])

    useEffect(()=>{
        if(props.updates.unit){
            const id_list=[]
            const elem_obj ={}
            let id = 1
            for(key_name of Object.keys(props.updates.unit)){
                id_list.push(id)
                elem_obj[id] = {brand_description:key_name,message:props.updates.unit['key_name']}
            }
        }
        setUpdates({...updates,unit:elem_obj,unit_list:id_list})
        
    },[props.updates])

    useEffect(()=>{
        if(props.updates.unit_name){
            const id_list=[]
            const elem_obj ={}
            let id = 1
            for(key_name of Object.keys(props.updates.unit_name)){
                id_list.push(id)
                elem_obj[id] = {brand_description:key_name,message:props.updates.unit_name['key_name']}
            }
        }
        setUpdates({...updates,unit_name:elem_obj,unit_name_list:id_list})
        
    },[props.updates])

  return (
    <Modal
      show = {props.show}
      onHide = {props.onHide}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          <div style={{color:'green'}}>Updates</div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Fragment>
          {updates.cost &&
                <div>
                    <h3>Price Updates</h3>
                     {updates.cost_list.map(map_price_updates)}     
                </div>
          }
      </Fragment>
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
