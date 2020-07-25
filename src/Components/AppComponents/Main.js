import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Stats from './Stats';
import Expenses from './Expenses';
import Profile from './Profile';
import SideNav from '../Layouts/SideNav';
import Header from '../Layouts/Header';
import { fetchBudget, fetchExpenses, addExpense, expensesLoading,
    updateBudget, updateExpense, deleteExpense } from '../../Redux/ActionCreators';

const mapStateToProps = (state) => {
    return({
        budget: state.budget,
        expenses: state.expenses
    })
}

const mapDispatchToProps = (dispatch) => {
    return({
        fetchBudget: (userid) => {
            return dispatch(fetchBudget(userid));
        },
        updateBudget: (budget, userid) => {
            return dispatch(updateBudget(budget, userid));
        },
        fetchExpenses: (userid) => {
            return dispatch(fetchExpenses(userid));
        },
        addExpense: (expense, userid) => {
            return dispatch(addExpense(expense, userid));
        },
        updateExpense: (expense, id, userid) => {
            return dispatch(updateExpense(expense, id, userid));
        },
        deleteExpense: (id, userid) => {
            return dispatch(deleteExpense(id, userid));
        },
        expensesLoading: () =>{
            return dispatch(expensesLoading());
        }
    })
}

class Main extends React.Component{

    state = {
        budget: 0,
        expenses: []
    }

    componentDidMount(){
        this.fetchBudget();
        this.fetchExpenses();
    }

    fetchExpenses = async() => {
        const {id} = this.props.user;
        this.props.fetchExpenses(id);
    }

    fetchBudget = async() => {
        const {id} = this.props.user;
        this.props.fetchBudget(id);
    }

    updateBudget = async(values) => {
        const {id} = this.props.user;
        const budget = parseInt(values.budget);
        this.props.updateBudget(budget, id);
    }

    addExpense = async(values) => {
        const {id} = this.props.user;
        const expense = {
            name: values.name,
            category: values.category,
            amount: values.amt,
            expense_date: values.date,
            user_id: this.props.user.id
        }
        this.props.addExpense(expense, id);
    }

    deleteExpense = async(id) => {
        const userid = this.props.user.id;
        this.props.deleteExpense(id, userid);
    }

    updateExpense = async(values, id) => {
        const userid = this.props.user.id;
        const expense = {
            name: values.name,
            category: values.category,
            amount: values.amt,
            expense_date: values.date,
            user_id: this.props.user.id
        }
        this.props.updateExpense(expense, id, userid);
    }

    render(){
        return(
            <BrowserRouter>
            <div className="bigScreen">
                <SideNav />
            </div>
            <div className="smallScreen">
                <Header />
            </div>
            <main>
            <Switch>
                <Route exact path='/expenses' component={() => <Expenses 
                        user={this.props.user}
                        onAddExpense={(values) => this.addExpense(values)}
                        onUpdate={(values,id) => this.updateExpense(values,id)}
                        onDelete={(id) => this.deleteExpense(id)}
                        onUpdateBudget={(values) => this.updateBudget(values)}
                        fetchBudget={() => this.fetchBudget()} 
                        budget={this.props.budget.budget}
                        fetchExpenses={() => this.fetchExpenses()} 
                        expenses={this.props.expenses.expenses}
                        isLoading={this.props.expenses.isLoading}
                        errMess={this.props.expenses.errMess}
                        expenseErrMess={this.props.expenses.expenseErrMess} /> } />

                <Route exact path='/stats' component={() => <Stats 
                        user={this.props.user}
                        onUpdate={(values,id) => this.updateExpense(values,id)}
                        onDelete={(id) => this.deleteExpense(id)}
                        budget={this.props.budget.budget}
                        fetchExpenses={() => this.fetchExpenses()} 
                        expenses={this.props.expenses.expenses}
                        isLoading={this.props.expenses.isLoading}
                        errMess={this.props.expenses.errMess}
                        expenseErrMess={this.props.expenses.expenseErrMess} /> } />

                <Route exact path='/profile' component={() => <Profile 
                        user={this.props.user} 
                        budget={this.props.budget.budget}
                        onUpdateBudget={(values) => this.updateBudget(values)} /> } />

                <Redirect to='/expenses' />
            </Switch>
            </main>
            </BrowserRouter>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);