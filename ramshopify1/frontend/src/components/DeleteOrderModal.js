import React ,{Fragment} from "react"
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function DeleteOrderModal(props) {
 

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
          <div style={{color:'red'}}>Confirmation</div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Fragment>
        <div> Are you sure you want to delete this Order with Id <span style={{color:'red'}}>{ props.last_ordercode}?</span></div><br/>
         <div className = 'confirm-delete-buttons'>
         <div onClick = {props.delete_order} align="center" className = 'del-btn btn btn-danger'>
                Yes, Delete
         </div>
         <div onClick = {props.onHide} align="center" className = 'del-btn btn btn-success'>
                No
         </div>
         </div>
         
      </Fragment>
      </Modal.Body>
      <Modal.Footer>
        <div className = 'btn btn-success' onClick={props.onHide}>Close</div>
      </Modal.Footer>
    </Modal>
  );
}

