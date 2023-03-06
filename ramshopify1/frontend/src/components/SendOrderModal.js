import React ,{Fragment} from "react"
import Modal from 'react-bootstrap/Modal';

export default function SendOrderModal(props) {
 

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
          <div style={{color:'green'}}>Confirmation</div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Fragment>
        <div> Are you sure you want to send this Order with Id <span style={{color:'green'}}>  {props.last_ordercode} ?</span></div><br/>
         <div className = 'confirm-delete-buttons'>
         <div onClick = {props.send_email_code} align="center" className = 'del-btn btn btn-success'>
                Yes, Send!
         </div>
         <div onClick = {props.onHide} align="center" className = 'del-btn btn btn-warning'>
                Not Yet
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

