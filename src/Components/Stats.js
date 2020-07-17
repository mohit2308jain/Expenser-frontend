import React from 'react';
import { Input } from 'reactstrap';

import LineChartExample from './Charts/LineChartExample';
import PieChartExample  from './Charts/PieChartExample';
import ExpenseTable from './ExpenseTable';

class Stats extends React.Component{

    state = {
        categoryfilter: 'Show All',
        searchfilter: ''
    }

    handleDelete = async(id) => {
        await this.props.onDelete(id);
        await this.props.fetchExpenses();
    }

    handleUpdate = async(values,id) => {
        await this.props.onUpdate(values,id);
        await this.props.fetchExpenses();
    }

    onCategoryDropdownSelected = (event) => {
        this.setState({categoryfilter: event.target.value});
    }

    onTaskSearch = (event) => {
        this.setState({searchfilter: event.target.value});
    }

    render(){

        const budget = this.props.budget;
        const totalExpenses = this.props.expenses.reduce((acc, expense) => acc + parseInt(expense.amount), 0);
        let expenses = this.props.expenses;
        const { searchfilter, categoryfilter } = this.state;
        
        if(searchfilter){
            expenses = expenses.filter((expense) => {
                return expense.name.toLowerCase().includes(searchfilter.toLowerCase());
            })
        }

        if(categoryfilter!=='Show All'){
            expenses = expenses.filter((expense) => {
                return expense.category.includes(categoryfilter);
            })
        }

        return(
            <React.Fragment>
            <div className="container-fluid my-1">
                <div className="row my-2">
                    <div className="col-12 col-md-5 border border-dark mr-2">
                    <h5>Bar Chart</h5>
                    <LineChartExample budget={budget} totalExpenses={totalExpenses}/>
                    </div>
                    <div className="col-12 col-md-5 border border-dark pb-2">
                    <h5>Pie Chart</h5>
                    <PieChartExample expenses={expenses}/>
                    </div>
                </div>
                <div className="row my-2">
                    <div className="col-6 px-0">
                        <Input type="text" onChange={(event) => this.onTaskSearch(event)} label="Filter By Task"
                            placeholder="Enter Task" style={{background: '#333', color:'white'}}/>
                    </div>
                    <div className="col-6 px-0">
                        <Input type="select" onChange={(event) => this.onCategoryDropdownSelected(event)} 
                            label="Filter By Category" style={{background: '#333', color:'white'}}>
                            <option key='0' value='Show All'>Show All</option>
                            <option key='1' value='Grocery'>Grocery</option>
                            <option key='2' value='Work'>Work</option>
                            <option key='3' value='Shopping'>Shopping</option>
                            <option key='4' value='Other'>Other</option>
                        </Input>
                    </div>
                </div>
                <div className="row my-2 px-md-2">
                <ExpenseTable expenses={expenses} 
                    onUpdate={(values,id) => this.handleUpdate(values,id)}
                    onDelete={(id) => this.handleDelete(id)} />
                </div>
            </div>
            </React.Fragment>
        )
    }
}

export default Stats;