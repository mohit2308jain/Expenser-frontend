import React from 'react';
import { Modal, ModalBody, ModalHeader, ModalFooter, Button } from 'reactstrap';

class DeleteModal extends React.Component{

    state={
        isDeleteModalOpen: false
    }

    toggleDeleteModal = () => {
        this.setState({isDeleteModalOpen: !this.state.isDeleteModalOpen});
    }

    handleDelete = (id) => {
        this.toggleDeleteModal()
        this.props.onSubmit(id);
    }

    render(){
        const expense = this.props.expense;

        return(
            <React.Fragment>
                <i className="fa fa-trash" onClick={() => this.toggleDeleteModal()}/>

                <Modal isOpen={this.state.isDeleteModalOpen} toggle={this.toggleDeleteModal} 
                    className="modal-dialog modal-dialog-centered text-light text-center">
                    
                    <ModalHeader toggle={this.toggleDeleteModal}  className="border border-light modalHeader">
                        Delete Expense</ModalHeader>
                    
                    <ModalBody className="border border-light modalBody">
                        <h4>Are you sure you want to delete expense: {expense.name} ?</h4>
                    </ModalBody>
                    
                    <ModalFooter className="border border-light modalHeader">
                        <Button color="danger" outline onClick={() => this.handleDelete(expense.id)}>Delete</Button>
                        <Button color="primary" outline onClick={() => this.toggleDeleteModal()}>Close</Button>
                    </ModalFooter>
                </Modal>

            </React.Fragment>
        )
    }
}

export default DeleteModal;