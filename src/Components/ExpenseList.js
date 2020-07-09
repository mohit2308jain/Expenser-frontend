import React from 'react';
import { Button, Label, Modal, ModalBody, ModalHeader, Table, Jumbotron } from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';

import baseURL from '../Redux/baseUrl';

const required = (val) => {
    return (val && val.length);
  }
    
  const maxLength = (len) => (val) => {
    return (!(val) || (val.length <= len));
  }
  
  const minLength = (len) => (val) => {
    return ( val && (val.length >= len));
  }

const data = [
    {
        id: 1,
        category: 'cat1',
        name: 'item1',
        amount: 200,
        date: new Date()
    },
    {
        id: 2,
        category: 'cat2',
        name: 'item2',
        amount: 100,
        date: new Date()
    },
    {
        id: 3,
        category: 'cat1',
        name: 'item3',
        amount: 50,
        date: new Date()
    }
]

class ExpenseList extends React.Component{

    state = {
        isModalOpen: false,
        isBudgetModalOpen: false,
        expenses: [],
        budget: null
    }

    fetchExpenses = async() => {
        const {id} = this.props.user;
        try{
            const resp = await baseURL.get(`/expenses/${id}`)
            console.log(resp);
            this.setState({expenses: resp.data})
        }
        catch(err){
            console.log(err);
        }
    }

    fetchBudget = async() => {
        const {id} = this.props.user;
        try{
            const resp = await baseURL.get(`/budget/${id}`)
            console.log(resp);
            this.setState({budget: resp.data.budget})
        }
        catch(err){
            console.log(err);
        }
    }

    componentDidMount(){
        this.fetchBudget()
        this.fetchExpenses()
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

    handleBudget = async(values) => {
        //console.log(typeof(parseInt(values.budget)));
        try{
            const resp = await baseURL.put(`/budget`,{
                id: this.props.user.id,
                budget: parseInt(values.budget)
            })
            this.fetchBudget();
        }
        catch(err){
            console.log(err);
        }
        this.toggleBudgetModal();
    }
      
    handleSubmit = (values) => {
        //console.log(new Date(values.date));
        this.toggleModal();
    }

    render(){

        return(
            <React.Fragment>
            <Jumbotron>
                <div className="row text-center">
                    <div className="col-12 col-md-3 border border-dark p-1">
                        <h2>Total Budget</h2>
                        <h5>{this.state.budget}</h5>
                    </div>
                    <div className="col-12 col-md-3 border border-dark p-1">
                        <h2>Total Expenses</h2>
                        <h5>30000</h5>
                    </div>
                    <div className="col-12 col-md-3 border border-dark p-1">
                        <h2>Balance</h2>
                        <h5>30000</h5>
                    </div>
                    <div className="col-12 offset-md-1 col-md-2 border border-dark p-1">
                        <Button color="success" className="m-1"
                        onClick={() => this.toggleModal()}>Add Expense</Button>
                        <br />
                        <Button color="success" className="m-1"
                        onClick={() => this.toggleBudgetModal()}>Update Budget</Button>
                    </div>
                </div>
            </Jumbotron>
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
                        this.state.expenses.map((d) => {
                            return(
                                <tr key={d.id}>
                                    <td>{d.id}</td>
                                    <td>{d.category}</td>
                                    <td>{d.name}</td>
                                    <td>{d.amount}</td>
                                    <td>
                                        {new Intl.DateTimeFormat('en-IN', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(d.expense_date)))}
                                    </td>
                                    <td><i className="fa fa-pencil" /></td>
                                    <td><i className="fa fa-trash" /></td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>

            <Modal isOpen={this.state.isBudgetModalOpen} toggle={this.toggleBudgetModal} 
                style={{color:'black'}} className="modal-dialog modal-dialog-centered">
                <ModalHeader toggle={this.toggleBudgetModal}>Update Budget</ModalHeader>
                <ModalBody>
                <LocalForm onSubmit={(values) => this.handleBudget(values)}>

                    <div className="form-group">
                        <Label htmlFor="budget">Budget</Label>
                        <Control.input type="number" model=".budget" id="budget"
                            name="budget" placeholder="Enter Budget"
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
                <LocalForm onSubmit={(values) => this.handleSubmit(values)}>

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