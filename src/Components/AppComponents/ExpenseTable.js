import React from 'react';
import { Table, Spinner } from 'reactstrap';

import ExpenseForm from './ExpenseForm';
import DeleteModal from './DeleteModal';

const ExpenseTable = (props) => {

    const handleDelete = async(id) => {
        await props.onDelete(id);
    }

    const handleUpdate = async(values,id) => {
        await props.onUpdate(values,id);
    }

    let expenses = props.expenses;
    const isLoading = props.isLoading;
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
                    {expenses.map((expense, index) => {
                        return(
                            <tr key={expense.id}>
                                <td>{index+1}</td>
                                <td>{expense.category}</td>
                                <td>{expense.name}</td>
                                <td>{expense.amount}</td>
                                <td>
                                    {new Intl.DateTimeFormat('en-IN', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(expense.expense_date)))}
                                </td>
                                <td>
                                    <ExpenseForm action="Update" expense={expense} 
                                        onSubmit={(values) => handleUpdate(values, expense.id)} />
                                </td>
                                <td>
                                    <DeleteModal expense={expense} 
                                        onSubmit={(id) => handleDelete(id)} />
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

    const msg = props.expenseErrMess;
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

export default ExpenseTable;