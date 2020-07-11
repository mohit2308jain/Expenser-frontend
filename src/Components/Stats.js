import React from 'react';
import { Table, Input } from 'reactstrap';

import LineChartExample from './LineChartExample';
import PieChartExample  from './PieChartExample';
import UpdateForm from './UpdateForm';

class Stats extends React.Component{

    state = {
        categoryfilter: 'Show All',
        searchfilter: ''
    }

    handleDelete = async(e,id) => {
        e.preventDefault();
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
        //const balance = (budget - totalExpenses);
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
            <div className="container-fluid mt-1">
                <div className="row my-2">
                    <div className="col-12 col-md-6 col-lg-4 border border-dark">
                    <LineChartExample budget={budget} totalExpenses={totalExpenses}/>
                    </div>
                    <div className="col-12 col-md-6 col-lg-4 border border-dark">
                    <h5>Pie</h5>
                    <PieChartExample expenses={expenses}/>
                    </div>
                </div>
                <div className="row my-2">
                    <div className="col-6">
                        <Input type="text" onChange={(event) => this.onTaskSearch(event)} label="Filter By Task"
                            placeholder="Enter Task" style={{background: '#333', color:'white'}}/>
                    </div>
                    <div className="col-6">
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
                <div className="row my-2">
                    {
                        (expenses.length)?(
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
                                        expenses.map((d, index) => {
                                            return(
                                                <tr key={d.id}>
                                                    <td>{index}</td>
                                                    <td>{d.category}</td>
                                                    <td>{d.name}</td>
                                                    <td>{d.amount}</td>
                                                    <td>
                                                        {new Intl.DateTimeFormat('en-IN', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(d.expense_date)))}
                                                    </td>
                                                    <td>
                                                        <UpdateForm expense={d} onUpdate={(values) => this.handleUpdate(values,d.id)} />
                                                    </td>
                                                    <td><i className="fa fa-trash" 
                                                    onClick={(e) => this.handleDelete(e,d.id)}/></td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </Table>
                        ):
                        (<h1>No Expeses....</h1>)
                    }
                </div>
            </div>
            </React.Fragment>
        )
    }
}

export default Stats;