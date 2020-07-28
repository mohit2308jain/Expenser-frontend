import React from 'react';
import { Input } from 'reactstrap';

import LineChart from '../Charts/LineChart';
import ExpensePieChart  from '../Charts/PieChart';
import ExpenseTable from './ExpenseTable';

const Stats = (props) => {

    const [categoryFilter, setCategoryFilter] = React.useState('Show All');
    const [searchFilter, setSearchFilter] = React.useState('');

    const handleDelete = async(id) => {
        await props.onDelete(id);
    }

    const handleUpdate = async(values, id) => {
        await props.onUpdate(values, id);
    }

    const onCategoryDropdownSelected = (event) => {
        setCategoryFilter(event.target.value);
    }

    const onTaskSearch = (event) => {
        setSearchFilter(event.target.value);
    }


    const budget = props.budget;
    const totalExpenses = props.expenses.reduce((acc, expense) => acc + parseInt(expense.amount), 0);
    let expenses = props.expenses;
    
    if(searchFilter){
        expenses = expenses.filter((expense) => {
            return expense.name.toLowerCase().includes(searchFilter.toLowerCase());
        })
    }

    if(categoryFilter!=='Show All'){
        expenses = expenses.filter((expense) => {
            return expense.category.includes(categoryFilter);
        })
    }

    return(
        <React.Fragment>

            <div className="container-fluid my-1">
                
                <div className="row my-2">
                    <div className="col-12 col-md-6 border border-dark my-1 text-center">
                        <h5><u>Bar Chart</u></h5>
                        <LineChart budget={budget} totalExpenses={totalExpenses}/>
                    </div>

                    <div className="col-12 col-md-6 border border-dark pb-2 my-1 text-center">
                        <h5><u>Pie Chart</u></h5>
                        <ExpensePieChart expenses={expenses}/>
                    </div>
                </div>

                <div className="row my-2">
                    
                    <div className="col-6 px-0">
                        <Input type="text" onChange={(event) => onTaskSearch(event)} label="Filter By Task"
                            placeholder="Enter Task" style={{background: '#333', color:'white'}}/>
                    </div>

                    <div className="col-6 px-0">
                        <Input type="select" onChange={(event) => onCategoryDropdownSelected(event)} 
                            label="Filter By Category" style={{background: '#333', color:'white'}}>
                            
                            <option key='0' value='Show All'>Show All</option>
                            <option key='1' value='Grocery'>Grocery</option>
                            <option key='2' value='Work'>Work</option>
                            <option key='3' value='Shopping'>Shopping</option>
                            <option key='4' value='Other'>Other</option>

                        </Input>
                    </div>

                </div>

                <div className="row">
                    <ExpenseTable expenses={expenses}
                        isLoading={props.isLoading}
                        onUpdate={(values,id) => handleUpdate(values,id)}
                        onDelete={(id) => handleDelete(id)}
                        errMess={props.errMess}
                        expenseErrMess={props.expenseErrMess} />
                </div>

            </div>
        </React.Fragment>
    )
}

export default Stats;