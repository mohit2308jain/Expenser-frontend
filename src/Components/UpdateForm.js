import React from 'react';
import { LocalForm, Control, Errors } from 'react-redux-form';
import { Button, Label, Modal, ModalBody, ModalHeader } from 'reactstrap';


const required = (val) => {
    return (val && val.length);
}
  
const maxLength = (len) => (val) => {
    return (!(val) || (val.length <= len));
}

const minLength = (len) => (val) => {
    return ( val && (val.length >= len));
}

class UpdateForm extends React.Component {

    state = {
        isUpdateModalOpen: false
    }

  toggleUpdateModal = () => {
    this.setState({
      isUpdateModalOpen: !this.state.isUpdateModalOpen
    });
  }

  handleUpdate = (values) => {
    this.props.onUpdate(values);
    this.toggleUpdateModal();
  }
  
  render() {
    const d = this.props.expense;
    const da = new Date(Date.parse(d.expense_date)).toLocaleDateString('en-IN',{month:"2-digit",day:"2-digit",year:"numeric"}).split( '/' ).reverse( ).join( '-' );    

    return (

      <React.Fragment>
        <i className="fa fa-pencil" onClick={() => this.toggleUpdateModal()}/>

        <Modal isOpen={this.state.isUpdateModalOpen} toggle={this.toggleUpdateModal} 
                style={{color:'black'}} className="modal-dialog modal-dialog-centered">
                <ModalHeader toggle={this.toggleUpdateModal}>Update Expense</ModalHeader>
                <ModalBody>
                <LocalForm onSubmit={(values) => this.handleUpdate(values)}>

                    <div className="form-group">
                    <Label htmlFor="category">Category</Label>
                    <Control.select model=".category" name="category"
                        className="form-control" defaultValue={d.category}>
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
                        className="form-control" defaultValue={d.name} 
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
                        name="amt" placeholder="Enter Amount" defaultValue={d.amount}
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
                        name="date" className="form-control" defaultValue={da}
                        validators={{ required}} />

                    <Errors className="text-danger"
                        model=".date" show="touched"
                        messages={{ required: 'Required'}}
                    />
                    </div>

                    <Button type="submit" value="submit" color="primary" outline className="m-1">
                        Submit</Button>
                    <Button type="button" color="danger" outline onClick={() => this.toggleUpdateModal()} className="m-1">
                        Close</Button>
                                
                </LocalForm>
                </ModalBody>
            </Modal>

      </React.Fragment>
    )
  }
}

export default UpdateForm;