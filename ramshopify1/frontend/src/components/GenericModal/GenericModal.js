import React ,{Fragment} from "react"
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import GenericModalTable from './GenericModalTable'

export default function GenericModal(props) {
 
  const generic_modal  = {
    position:"relative"
  }

  const generic_modal_table = {
    position:"absolute",
    width:"100%",

  }

  return (
    <Modal
      show = {props.show}
      onHide = {props.onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      dialogClassName = {generic_modal}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Generic Products
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Fragment>
          <div align="center" className = {generic_modal_table}>
            <GenericModalTable/>
          </div>
      </Fragment>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

