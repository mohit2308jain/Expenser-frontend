import React from 'react';
import { Modal, ModalBody, ModalHeader, ModalFooter, Button } from 'reactstrap';

const DeleteModal = (props) => {

    const [isDeleteModalOpen, toggleDeleteModal] = React.useState(false);

    const handleDelete = (id) => {
        toggleDeleteModal(!isDeleteModalOpen);
        props.onSubmit(id);
    }

    const expense = props.expense;

    return(
        <React.Fragment>
            <i className="fa fa-trash" onClick={() => toggleDeleteModal(!isDeleteModalOpen)}/>

            <Modal isOpen={isDeleteModalOpen} toggle={() => toggleDeleteModal(!isDeleteModalOpen)} 
                className="modal-dialog modal-dialog-centered text-light text-center">
                
                <ModalHeader toggle={() => toggleDeleteModal(!isDeleteModalOpen)}  className="border border-light modalHeader">
                    Delete Expense</ModalHeader>
                
                <ModalBody className="border border-light modalBody">
                    <h4>Are you sure you want to delete expense: {expense.name} ?</h4>
                </ModalBody>
                
                <ModalFooter className="border border-light modalHeader">
                    <Button color="danger" outline onClick={() => handleDelete(expense.id)}>Delete</Button>
                    <Button color="primary" outline onClick={() => toggleDeleteModal(!isDeleteModalOpen)}>Close</Button>
                </ModalFooter>
            </Modal>

        </React.Fragment>
    )
}

export default DeleteModal;