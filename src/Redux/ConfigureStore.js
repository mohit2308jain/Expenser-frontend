import { combineReducers } from 'redux';

import { budgetReducer } from './BudgetReducer';
import { expenseReducer } from './ExpenseReducer';

export default combineReducers({
    budget: budgetReducer,
    expenses: expenseReducer
})