import React from 'react';
import { ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

export default class LineChartExample extends React.Component {

  render() {

    const data = [
        {
          name: 'Budget', value: this.props.budget,
        },
        {
          name: 'Expenses', value: this.props.totalExpenses,
        },
    ];

    return (
      <ComposedChart
        width={300}
        height={300}
        data={data}
        className="p-1"
      >
        <CartesianGrid stroke="#f5f5f5" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="value" barSize={20} fill="#413ea0" />
        <Line type="monotone" dataKey="value" stroke="#ff7300" />
      </ComposedChart>
    );
  }
}
