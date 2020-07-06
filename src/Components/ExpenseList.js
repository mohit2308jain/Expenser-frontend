import React from 'react';
import { Table, Button, Jumbotron } from 'reactstrap';

const data = [
    {
        id: 1,
        category: 'cat1',
        name: 'item1',
        amount: 200,
        date: new Date()
    },
    {
        id: 2,
        category: 'cat2',
        name: 'item2',
        amount: 100,
        date: new Date()
    },
    {
        id: 3,
        category: 'cat1',
        name: 'item3',
        amount: 50,
        date: new Date()
    }
]

class ExpenseList extends React.Component{
    render(){

        return(
            <React.Fragment>
            <Jumbotron>
                <div className="row text-center">
                    <div className="col-12 col-md-3 border border-dark p-1">
                        <h2>Total Budget</h2>
                        <h5>30000</h5>
                    </div>
                    <div className="col-12 col-md-3 border border-dark p-1">
                        <h2>Total Expenses</h2>
                        <h5>30000</h5>
                    </div>
                    <div className="col-12 col-md-3 border border-dark p-1">
                        <h2>Balance</h2>
                        <h5>30000</h5>
                    </div>
                    <div className="col-12 offset-md-1 col-md-2 border border-dark p-1">
                        <Button color="success" className="m-1">Add Expense</Button>
                        <br />
                        <Button color="success" className="m-1">Update Budget</Button>
                    </div>
                </div>
            </Jumbotron>
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
                        data.map((d) => {
                            return(
                                <tr key={d.id}>
                                    <td>{d.id}</td>
                                    <td>{d.category}</td>
                                    <td>{d.name}</td>
                                    <td>{d.amount}</td>
                                    <td>{d.date.toDateString()}</td>
                                    <td><i className="fa fa-pencil" /></td>
                                    <td><i className="fa fa-trash" /></td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
            </React.Fragment>
        )
    }
}

export default ExpenseList;