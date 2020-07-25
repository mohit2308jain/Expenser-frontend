import React from 'react';
import { Jumbotron } from 'reactstrap';

import ExpenseTable from './ExpenseTable';
import ExpenseForm from './ExpenseForm';
import BudgetForm from './BudgetForm';

class Expenses extends React.Component{

    handleUpdateBudget = async(values) => {
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
                        <BudgetForm budget={budget} onSubmit={(values) => this.handleUpdateBudget(values)} />
                    </div>
                </div>
            </Jumbotron>
            
            <ExpenseTable expenses={expenses}
                isLoading={this.props.isLoading} 
                onUpdate={(values,id) => this.handleUpdate(values,id)}
                onDelete={(id) => this.handleDelete(id)}
                errMess={this.props.errMess}
                expenseErrMess={this.props.expenseErrMess} />

            </React.Fragment>
        )
    }
}

export default Expenses;