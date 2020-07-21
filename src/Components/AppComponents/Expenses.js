import React from 'react';
import { Button, Label, Modal, ModalBody, ModalHeader, Jumbotron } from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';

import ExpenseTable from './ExpenseTable';
import './ModalForm.css';

const required = (val) => {
    return (val && val.length);
  }
    
  const maxLength = (len) => (val) => {
    return (!(val) || (val.length <= len));
  }
  
  const minLength = (len) => (val) => {
    return ( val && (val.length >= len));
  }

class Expenses extends React.Component{

    state = {
        isModalOpen: false,
        isBudgetModalOpen: false
    }
    
    toggleModal = () => {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
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
        this.toggleModal();
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
                        <Button color="success" outline className="m-1 font-weight-bold"
                        onClick={() => this.toggleModal()}>Add Expense</Button>
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
                            validators={{ required}}
                    />

                    <Errors className="text-danger"
                        model=".budget" show="touched"
                        messages={{ required: 'Required'}}
                    />
                    </div>

                    <Button type="submit" value="submit" color="primary" outline className="m-1">
                        Submit</Button>
                    <Button type="button" color="danger" outline onClick={() => this.toggleBudgetModal()} className="m-1">
                        Close</Button>

                </LocalForm>
                </ModalBody>
            </Modal>

            <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal} 
                className="modal-dialog modal-dialog-centered text-light text-center">
                <ModalHeader toggle={this.toggleModal} className="border border-light modalHeader">
                    Add Expense</ModalHeader>
                <ModalBody className="border border-light modalBody">
                <LocalForm onSubmit={(values) => this.handleAddExpense(values)}>

                    <div className="form-group">
                    <Label htmlFor="category">Category</Label>
                    <Control.select model=".category" name="category"
                        className="form-control" defaultValue="Grocery">
                        <option>Grocery</option>
                        <option>Work</option>
                        <option>Shopping</option>
                        <option>Other</option>
                    </Control.select>
                    </div>

                    <div className="form-group">
                    <Label htmlFor="name">Expense Name</Label>
                    <Control.text model=".name" id="name"
                        name="name" placeholder="Enter Expense Name"
                        className="form-control" 
                        validators={{ minLength: minLength(3), 
                        maxLength: maxLength(15)
                        }}
                    />

                    <Errors className="text-danger"
                        model=".name" show="touched"
                        messages={{minLength: 'Must be greater than 2 characters',
                            maxLength: 'Must be 15 characters or less'
                        }}
                    />
                    </div>

                    <div className="form-group">
                    <Label htmlFor="amt">Amount</Label>
                    <Control.input type="number" model=".amt" id="amt"
                        name="amt" placeholder="Enter Amount"
                        className="form-control" 
                        validators={{ required}}
                    />

                    <Errors className="text-danger"
                        model=".amt" show="touched"
                        messages={{ required: 'Required'}}
                    />
                    </div>

                    <div className="form-group">
                    <Label htmlFor="date">Date</Label>
                    <Control type="date" model=".date" id="date"
                        name="date" className="form-control"
                        validators={{ required}} />

                    <Errors className="text-danger"
                        model=".date" show="touched"
                        messages={{ required: 'Required'}}
                    />
                    </div>

                    <Button type="submit" value="submit" color="primary" outline className="m-1">
                        Submit</Button>
                    <Button type="button" color="danger" outline onClick={() => this.toggleModal()} 
                    className="m-1">Close</Button>
                                
                </LocalForm>
                </ModalBody>
            </Modal>
            </React.Fragment>
        )
    }
}

export default Expenses;