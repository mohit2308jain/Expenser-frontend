import React from 'react';
import { Button, Label, Modal, ModalBody, ModalHeader, Table, Jumbotron } from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';

import UpdateForm from './UpdateForm';
import baseURL from '../baseUrl';

const required = (val) => {
    return (val && val.length);
  }
    
  const maxLength = (len) => (val) => {
    return (!(val) || (val.length <= len));
  }
  
  const minLength = (len) => (val) => {
    return ( val && (val.length >= len));
  }

class ExpenseList extends React.Component{

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

    updateBudget = async(values) => {
        this.toggleBudgetModal();
        try{
            await baseURL.put('/budget',{
                id: this.props.user.id,
                budget: parseInt(values.budget)
            })
            await this.props.fetchBudget();
        }
        catch(err){
            console.log(err);
        }
    }
      
    addExpense = async(values) => {
        const expense = {
            name: values.name,
            category: values.category,
            amount: values.amt,
            expense_date: values.date,
            user_id: this.props.user.id
        }
        this.toggleModal();
        try{
            await baseURL.post('/expense', expense);
            await this.props.fetchExpenses();
        }
        catch(err){
            console.log(err);
        }
    }

    handleDelete = async(e,id) => {
        e.preventDefault();
        await this.props.onDelete(id);
        await this.props.fetchExpenses();
    }

    handleUpdate = async(values,id) => {
        await this.props.onUpdate(values,id);
        await this.props.fetchExpenses();
    }

    render(){
        console.log(this.props);
        const budget = this.props.budget;
        const totalExpenses = this.props.expenses.reduce((acc, expense) => acc + parseInt(expense.amount), 0);
        let expenses = this.props.expenses;
        const balance = (budget - totalExpenses);

        return(
            <React.Fragment>
            <Jumbotron style={{background: 'linear-gradient(110.53deg,#152530 0%,#040203 100%)', color: 'white'}}>
                <div className="row text-center">
                    <div className="col-12 col-md-4 border border-dark p-1">
                        <h2>Total Budget</h2>
                        <h5>{budget}</h5>
                    </div>
                    <div className="col-12 col-md-4 border border-dark p-1">
                        <h2>Total Expenses</h2>
                        <h5>{totalExpenses}</h5>
                    </div>
                    <div className="col-12 col-md-2 border border-dark p-1">
                        <h2>Balance</h2>
                        <h5>{balance}</h5>
                    </div>
                    <div className="col-12 col-md-2 border border-dark p-1">
                        <Button color="success" outline className="m-1 font-weight-bold"
                        onClick={() => this.toggleModal()}>Add Expense</Button>
                        <br />
                        <Button color="success" outline className="m-1 font-weight-bold"
                        onClick={() => this.toggleBudgetModal()}>Update Budget</Button>
                    </div>
                </div>
            </Jumbotron>
            {
                (totalExpenses)?(
                    <Table striped dark>
                        <thead>
                            <tr>
                            <th>#</th>
                            <th>Category</th>
                            <th>Name</th>
                            <th>Amount</th>
                            <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                expenses.map((d, index) => {
                                    return(
                                        <tr key={d.id}>
                                            <td>{index}</td>
                                            <td>{d.category}</td>
                                            <td>{d.name}</td>
                                            <td>{d.amount}</td>
                                            <td>
                                                {new Intl.DateTimeFormat('en-IN', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(d.expense_date)))}
                                            </td>
                                            <td>
                                                <UpdateForm expense={d} onUpdate={(values) => this.handleUpdate(values,d.id)} />
                                            </td>
                                            <td><i className="fa fa-trash" 
                                            onClick={(e) => this.handleDelete(e,d.id)}/></td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </Table>
                ):
                (<h1>No Expeses....</h1>)
            }

            <Modal isOpen={this.state.isBudgetModalOpen} toggle={this.toggleBudgetModal} 
                style={{color:'black'}} className="modal-dialog modal-dialog-centered">
                <ModalHeader toggle={this.toggleBudgetModal}>Update Budget</ModalHeader>
                <ModalBody>
                <LocalForm onSubmit={(values) => this.updateBudget(values)}>

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
                style={{color:'black'}} className="modal-dialog modal-dialog-centered">
                <ModalHeader toggle={this.toggleModal}>Add Expense</ModalHeader>
                <ModalBody>
                <LocalForm onSubmit={(values) => this.addExpense(values)}>

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
                    <Button type="button" color="danger" outline onClick={() => this.toggleModal()} className="m-1">
                        Close</Button>
                                
                </LocalForm>
                </ModalBody>
            </Modal>
            </React.Fragment>
        )
    }
}

export default ExpenseList;