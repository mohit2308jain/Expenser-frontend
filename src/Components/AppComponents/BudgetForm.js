import React from 'react';
import { Button, Modal, ModalBody, ModalHeader, Label } from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';

import './ModalForm.css';

const required = (val) => {
    return (val && val.length);
}

class BudgetForm extends React.Component{

    state = {
        isBudgetModalOpen: false
    }

    toggleBudgetModal = () => {
        this.setState({
            isBudgetModalOpen: !this.state.isBudgetModalOpen
        });
    }

    handleUpdateBudget = async(values) => {
        this.toggleBudgetModal();
        this.props.onSubmit(values);
    }

    render(){
        const budget = this.props.budget;

        return(
            <React.Fragment>
                <Button color="success" outline className="m-1 font-weight-bold"
                    onClick={() => this.toggleBudgetModal()}>Update Budget</Button>

                <Modal isOpen={this.state.isBudgetModalOpen} toggle={this.toggleBudgetModal} 
                    className="modal-dialog modal-dialog-centered text-light text-center">

                    <ModalHeader toggle={this.toggleBudgetModal}  className="border border-light modalHeader">
                        Update Budget</ModalHeader>

                    <ModalBody className="border border-light modalBody">

                        <LocalForm onSubmit={(values) => this.handleUpdateBudget(values)}>

                            <div className="form-group">
                                <Label htmlFor="budget">Budget</Label>
                                <Control.input type="number" model=".budget" id="budget"
                                    name="budget" placeholder="Enter Budget" defaultValue={budget}
                                    className="form-control" 
                                    validators={{ required }}
                            />

                            <Errors className="text-danger alert alert-danger mt-1 font-weight-bold"
                                model=".budget" show="touched"
                                messages={{ required: 'You must enter the amount for the budget.' }}
                            />
                            </div>

                            <div className="text-right">
                                <Button type="submit" value="submit" color="primary" outline className="m-1">
                                    Submit</Button>
                                <Button type="button" color="danger" outline onClick={() => this.toggleBudgetModal()} className="m-1">
                                    Close</Button>
                            </div>

                        </LocalForm>
                    </ModalBody>
                </Modal>
            </React.Fragment>
        )
    }

}

export default BudgetForm;