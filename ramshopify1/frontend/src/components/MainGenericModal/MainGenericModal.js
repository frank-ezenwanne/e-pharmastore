import React ,{Fragment} from "react"
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import MainGenericModalTable from './MainGenericModalTable'

export default function MainGenericModal(props) {
 
  const generic_modal  = {
    position:"relative"
  }

  const generic_modal_table = {
  marginLeft:'5%'

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
          <div style={generic_modal_table}>
            <MainGenericModalTable
              productid_list={props.productid_list}
              onHide={props.onHide}
            />
          </div>
      </Fragment>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

