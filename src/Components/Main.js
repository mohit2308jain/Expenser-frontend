import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import Stats from './Stats';
import Expenses from './Expenses';
import SideNav from './SideNav';
import baseURL from '../baseUrl';

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
        try{
            const resp = await baseURL.get(`/expenses/${id}`)
            //console.log(resp);
            await this.setState({expenses: resp.data})
        }
        catch(err){
            this.setState({expenses: []})
        }
    }

    fetchBudget = async() => {
        const {id} = this.props.user;
        try{
            const resp = await baseURL.get(`/budget/${id}`)
            await this.setState({budget: resp.data.budget})
        }
        catch(err){
            this.setState({budget: 0});
        }
    }

    updateBudget = async(values) => {
        try{
            await baseURL.put('/budget',{
                id: this.props.user.id,
                budget: parseInt(values.budget)
            })
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
        try{
            await baseURL.post('/expense', expense);
        }
        catch(err){
            console.log(err);
        }
    }

    deleteExpense = async(id) => {
        try{
            await baseURL.delete(`/expense/${id}`);
        }
        catch(err){
            console.log(err)
        }
    }

    updateExpense = async(values,id) => {
        console.log(values);
        const expense = {
            name: values.name,
            category: values.category,
            amount: values.amt,
            expense_date: values.date,
            user_id: this.props.user.id
        }
        try{
            await baseURL.put(`expense/${id}`, expense);
        }
        catch(err){
            console.log(err);
        }
    }

    render(){
        console.log(this.props.user)
        return(
            <BrowserRouter>
            <SideNav />
            <main>
            <Switch>
                <Route exact path='/expenses' component={() => <Expenses 
                        user={this.props.user}
                        onAddExpense={(values) => this.addExpense(values)}
                        onUpdate={(values,id) => this.updateExpense(values,id)}
                        onDelete={(id) => this.deleteExpense(id)}
                        onUpdateBudget={(values) => this.updateBudget(values)}
                        fetchBudget={() => this.fetchBudget()} 
                        budget={this.state.budget}
                        fetchExpenses={() => this.fetchExpenses()} 
                        expenses={this.state.expenses} /> } />

                <Route exact path='/stats' component={() => <Stats 
                        user={this.props.user}
                        onUpdate={(values,id) => this.updateExpense(values,id)}
                        onDelete={(id) => this.deleteExpense(id)}
                        budget={this.state.budget}
                        fetchExpenses={() => this.fetchExpenses()} 
                        expenses={this.state.expenses} /> } />

                <Redirect to='/expenses' />
            </Switch>
            </main>
            </BrowserRouter>
        )
    }
}

export default Main;