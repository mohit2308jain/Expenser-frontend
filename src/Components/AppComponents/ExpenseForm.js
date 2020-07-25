import React from 'react';
import { LocalForm, Control, Errors } from 'react-redux-form';
import { Button, Label, Modal, ModalBody, ModalHeader } from 'reactstrap';

import './ModalForm.css';

const required = (val) => {
    return (val && val.length);
}

const categoryRequired = (val) => {
    return (val !== "Select Category")
}


class ExpenseForm extends React.Component {

    state = {
        isUpdateModalOpen: false
    }

    toggleModal = () => {
        this.setState({
          isUpdateModalOpen: !this.state.isUpdateModalOpen
        });
    }

    handleSubmit = (values) => {
        this.props.onSubmit(values);
        this.toggleModal();
    }

    renderEntryButton = (action) => {
        if(action==='Add'){
            return(
                <Button color="success" outline className="m-1 font-weight-bold" onClick={() => this.toggleModal()}>
                    Add Expense
                </Button>
            )
        }
        else{
            return (<i className="fa fa-pencil" onClick={() => this.toggleModal()}/>)
        }
    }
  
    render() {
      const action = this.props.action;

      let expense, expenseDate;
      if(!this.props.expense){
          expense={
            category: "Select Category"
          }
      }
      else{
          expense = this.props.expense;
          expenseDate = new Date(Date.parse(expense.expense_date)).toLocaleDateString('en-IN',{month:"2-digit",day:"2-digit",year:"numeric"}).split( '/' ).reverse( ).join( '-' );
      }

      return (
          <React.Fragment>

              {this.renderEntryButton(action)}

              <Modal isOpen={this.state.isUpdateModalOpen} toggle={this.toggleModal}  
                  className="modal-dialog modal-dialog-centered text-light text-center">
                  
                  <ModalHeader toggle={this.toggleModal} className="border border-light modalHeader">
                      {action} Expense
                  </ModalHeader>
                  
                  <ModalBody className="border border-light modalBody">
                      <LocalForm onSubmit={(values) => this.handleSubmit(values)}>

                          <div className="form-group">
                              <Label htmlFor="category">Category</Label>
                              <Control.select model=".category" name="category"
                                  className="form-control" defaultValue={expense.category}
                                  validators={{ required: categoryRequired }} >
                                    <option>Select Category</option>
                                    <option>Grocery</option>
                                    <option>Work</option>
                                    <option>Shopping</option>
                                    <option>Other</option>
                              </Control.select>

                              <Errors className="text-danger alert alert-danger mt-1 font-weight-bold"
                                  model=".category" show="touched"
                                  messages={{ required: 'You must select the category of expense.' }}
                              />
                          </div>

                          <div className="form-group">
                              <Label htmlFor="name">Expense Name</Label>
                              <Control.text model=".name" id="name"
                                  name="name" placeholder="Enter Expense Name"
                                  className="form-control" defaultValue={expense.name} 
                                  validators={{ required: required }} />

                              <Errors className="text-danger alert alert-danger mt-1 font-weight-bold"
                                  model=".name" show="touched"
                                  messages={{ required: 'You must enter a name for the expense.' }} />

                          </div>

                          <div className="form-group">
                              <Label htmlFor="amt">Amount</Label>
                              <Control.input type="number" model=".amt" id="amt"
                                  name="amt" placeholder="Enter Amount"
                                  className="form-control" defaultValue={expense.amount}
                                  validators={{ required }} />

                              <Errors className="text-danger alert alert-danger mt-1 font-weight-bold"
                                  model=".amt" show="touched"
                                  messages={{ required: 'You must enter the amount of the expense.' }} />
                          </div>

                          <div className="form-group">
                              <Label htmlFor="date">Date</Label>
                              <Control type="date" model=".date" id="date"
                                  name="date" className="form-control" defaultValue={expenseDate}
                                  validators={{ required}} />

                              <Errors className="text-danger alert alert-danger mt-1 font-weight-bold"
                                  model=".date" show="touched"
                                  messages={{ required: 'Required' }} />
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

export default ExpenseForm;