import React from 'react';
import { Button, Label, Modal, ModalBody, ModalHeader, Jumbotron } from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';

import ExpenseTable from './ExpenseTable';
import ExpenseForm from './ExpenseForm';
import './ModalForm.css';

const required = (val) => {
   return (val && val.length);
}

class Expenses extends React.Component{

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
        await this.props.onUpdateBudget(values);
    }
      
    handleAddExpense = async(values) => {
        await this.props.onAddExpense(values);
    }

    handleDelete = async(id) => {
        await this.props.onDelete(id);
    }

    handleUpdate = async(values,id) => {
        await this.props.onUpdate(values,id);
    }
    

    render(){
        const budget = this.props.budget;
        const totalExpenses = this.props.expenses.reduce((acc, expense) => acc + parseInt(expense.amount), 0);
        let expenses = this.props.expenses;
        const balance = (budget - totalExpenses);

        return(
            <React.Fragment>
            <Jumbotron style={{background: 'linear-gradient(110.53deg,#152530 0%,#040203 100%)', color: 'white'}}
                className="p-3">
                <div className="row text-center">
                    <div className="col-12 h1 text-capitalize">
                        Welcome {this.props.user.name}
                    </div>
                </div>
                <div className="row text-center p-3">
                    <div className="col-12 col-md-4 border border-light p-1">
                        <h2>Total Budget</h2>
                        <h5>{budget}</h5>
                    </div>
                    <div className="col-12 col-md-4 border border-light p-1">
                        <h2>Total Expenses</h2>
                        <h5>{totalExpenses}</h5>
                    </div>
                    <div className="col-12 col-md-2 border border-light p-1">
                        <h2>Balance</h2>
                        <h5>{balance}</h5>
                    </div>
                    <div className="col-12 col-md-2 border border-light p-1">
                        <ExpenseForm action="Add" onSubmit={(values) => this.handleAddExpense(values)} />
                        <br />
                        <Button color="success" outline className="m-1 font-weight-bold"
                            onClick={() => this.toggleBudgetModal()}>Update Budget</Button>
                    </div>
                </div>
            </Jumbotron>
            
            <ExpenseTable expenses={expenses}
                isLoading={this.props.isLoading} 
                onUpdate={(values,id) => this.handleUpdate(values,id)}
                onDelete={(id) => this.handleDelete(id)}
                errMess={this.props.errMess}
                expenseErrMess={this.props.expenseErrMess} />

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

                    <Button type="submit" value="submit" color="primary" outline className="m-1">
                        Submit</Button>
                    <Button type="button" color="danger" outline onClick={() => this.toggleBudgetModal()} className="m-1">
                        Close</Button>

                </LocalForm>
                </ModalBody>
            </Modal>

            </React.Fragment>
        )
    }
}

export default Expenses;