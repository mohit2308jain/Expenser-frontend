import React from 'react';
import { Jumbotron } from 'reactstrap';

import ExpenseTable from './ExpenseTable';
import ExpenseForm from './ExpenseForm';
import BudgetForm from './BudgetForm';

const Expenses = (props) => {

    const handleUpdateBudget = async(values) => {
        await props.onUpdateBudget(values);
    }
      
    const handleAddExpense = async(values) => {
        await props.onAddExpense(values);
    }

    const handleDelete = async(id) => {
        await props.onDelete(id);
    }

    const handleUpdate = async(values, id) => {
        await props.onUpdate(values, id);
    }

    const budget = props.budget;
    const totalExpenses = props.expenses.reduce((acc, expense) => acc + parseInt(expense.amount), 0);
    let expenses = props.expenses;
    const balance = (budget - totalExpenses);

    return(
        <React.Fragment>
        <Jumbotron className="p-3 text-light"
            style={{background: 'linear-gradient(110.53deg,#152530 0%,#040203 100%)'}} >
            
            <div className="row text-center">
                <div className="col-12 h1 text-capitalize">
                    Welcome {props.user.name}
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
                    <ExpenseForm action="Add" onSubmit={(values) => handleAddExpense(values)} />
                    <br />
                    <BudgetForm budget={budget} onSubmit={(values) => handleUpdateBudget(values)} />
                </div>
                
            </div>
        </Jumbotron>
        
        <ExpenseTable expenses={expenses}
            isLoading={props.isLoading} 
            onUpdate={(values,id) => handleUpdate(values, id)}
            onDelete={(id) => handleDelete(id)}
            errMess={props.errMess}
            expenseErrMess={props.expenseErrMess} />

        </React.Fragment>
    )

}

export default Expenses;