import React from 'react';
import { ResponsiveContainer, PieChart, Pie, Tooltip, Cell } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const ExpensePieChart = (props) => {

    const expenses = props.expenses;
    const totalExpenses = expenses.reduce((acc, expense) => acc + parseInt(expense.amount), 0);

    const shoppingExpenses = expenses.filter((expense) => {
        return expense.category.includes('Shopping');
    }).reduce((acc, expense) => acc + parseInt(expense.amount), 0);

    const groceyExpenses = expenses.filter((expense) => {
        return expense.category.includes('Grocery');
    }).reduce((acc, expense) => acc + parseInt(expense.amount), 0);

    const workExpenses = expenses.filter((expense) => {
        return expense.category.includes('Work');
    }).reduce((acc, expense) => acc + parseInt(expense.amount), 0);

    const otherExpenses = expenses.filter((expense) => {
        return expense.category.includes('Other');
    }).reduce((acc, expense) => acc + parseInt(expense.amount), 0);
    

    const data = [
        { name: 'Grocery', value: groceyExpenses }, 
        { name: 'Work', value: workExpenses },
        { name: 'Shopping', value: shoppingExpenses }, 
        { name: 'Other', value: otherExpenses },
    ];

    return(
        <div style={{ width: '100%', height: 320 }}>
            {(totalExpenses) ? (
            <ResponsiveContainer>
                <PieChart>
                    <Pie dataKey="value" isAnimationActive={true} 
                        data={data} cx={200} cy={200} 
                        outerRadius={80} fill="#8884d8" label>
                    
                        {data.map((entry, index) => 
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                    </Pie>
                    <Tooltip />
                    
                </PieChart>
            </ResponsiveContainer>
            ) : (<h5 className="text-center">No Expenses..</h5>)}
      </div>
    )

}

export default ExpensePieChart;