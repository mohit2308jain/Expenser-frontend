import React from 'react';
import { Table, Spinner } from 'reactstrap';

import ExpenseForm from './ExpenseForm';
import DeleteModal from './DeleteModal';

class ExpenseTable extends React.Component { 

    handleDelete = async(id) => {
        await this.props.onDelete(id);
    }

    handleUpdate = async(values,id) => {
        await this.props.onUpdate(values,id);
    }

    render(){
        let expenses = this.props.expenses;
        const isLoading = this.props.isLoading;
        let table;

        if(isLoading){
            table = (<div className="container-fluid">
                <div className="row m-3">
                    <div className="col-12 text-center" style={{borderRadius: '5px'}}>
                    <Spinner style={{ width: '5rem', height: '5rem' }} />
                    <div className="display-4">Loading...</div>
                    </div>
                </div>
            </div>)
        }
        else if(expenses.length){
            table = (
                <Table striped dark className="table-bordered table-hover table-responsive-sm">
                    <thead>
                        <tr>
                        <th>#</th>
                        <th>Category</th>
                        <th>Name</th>
                        <th>Amount</th>
                        <th>Date</th>
                        <th colSpan="2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {expenses.map((d, index) => {
                            return(
                                <tr key={d.id}>
                                    <td>{index+1}</td>
                                    <td>{d.category}</td>
                                    <td>{d.name}</td>
                                    <td>{d.amount}</td>
                                    <td>
                                        {new Intl.DateTimeFormat('en-IN', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(d.expense_date)))}
                                    </td>
                                    <td>
                                        <ExpenseForm action="Update" expense={d} onSubmit={(values) => this.handleUpdate(values,d.id)} />
                                    </td>
                                    <td>
                                        <DeleteModal expense={d} onSubmit={(id) => this.handleDelete(id)} />
                                    </td>
                                </tr>
                            )})
                        }
                    </tbody>
                </Table>
            )
        }
        else{
            table = (
                <div className="col-12 text-center" style={{borderRadius: '5px'}}>
                    <div className="alert alert-light bg-dark text-light h2">
                        No Expenses Available !
                    </div>
                </div>
            )
        }

        const msg = this.props.expenseErrMess;
        let mess;
        if(msg){
            mess=(
                <div className="col-12 text-center" style={{borderRadius: '5px'}}>
                    <div className="alert alert-light bg-dark text-light h2">
                        {msg}
                    </div>
                </div>  
            )
        }

        return(
            <React.Fragment>
                {mess}
                {table}
            </React.Fragment>
        )
    }
}

export default ExpenseTable;