import { FETCH_BUDGET, FETCH_EXPENSES, LOADING_BUDGET, LOADING_EXPENSES, 
    EXPENSES_ERROR, BUDGET_ERROR, EXPENSE_CRUD_ERROR } from './Actions';
import baseURL from '../baseUrl';

export const fetchBudget = (userid) => {
    return async(dispatch) => {
        dispatch(budgetLoading());
        try{
            const resp = await baseURL.get(`/budget/${userid}`);
            dispatch({
                type: FETCH_BUDGET,
                payload: resp.data.budget
            })
        }
        catch(err){
            dispatch(budgetError('Error In Fetching Budget.'));
        }
    }
}

export const updateBudget = (budget, userid) => {
    return async(dispatch) => {
        try{
            await baseURL.put('/budget',{
                id: userid,
                budget: budget
            })
            dispatch(fetchBudget(userid));
        }
        catch(err){
            dispatch(budgetError('Error In Updating Budget.'));
        }
    }
}

const budgetLoading = () => {
    return (dispatch) => {
        dispatch({
            type: LOADING_BUDGET
        })
    }
}

const budgetError = (errMess) => {
    return (dispatch) => {
        dispatch({
            type: BUDGET_ERROR,
            payload: errMess
        })
    }
}

export const fetchExpenses = (userid) => {
    return async(dispatch) => {
        dispatch(expensesLoading());
        try{
            const resp = await baseURL.get(`/expenses/${userid}`);
            dispatch({
                type: FETCH_EXPENSES,
                payload: resp.data
            })
        }
        catch(err){
            dispatch(expensesError('Error In Fetching Expenses.'));
        }
    }
}

export const addExpense = (expense, userid) => {
    return async(dispatch) => {
        try{
            await baseURL.post('/expense', expense);
            dispatch(fetchExpenses(userid));
        }
        catch(err){
            dispatch(expenseCRUDError('Error In Adding Expense.', userid));
        }
    }
}

export const updateExpense = (expense, id, userid) => {
    return async(dispatch) => {
        try{
            await baseURL.put(`expens/${id}`, expense);
            dispatch(fetchExpenses(userid));
        }
        catch(err){
            dispatch(expenseCRUDError('Error In Updating Expense.', userid));
        }
    }
}

export const deleteExpense = (id, userid) => {
    return async(dispatch) => {
        try{
            await baseURL.delete(`/expens/${id}`);
            dispatch(fetchExpenses(userid));
        }
        catch(err){
            dispatch(expenseCRUDError('Error In Deleting Expense.', userid));
        }
    }
}

const expensesLoading = () => {
    return (dispatch) => {
        dispatch({
            type: LOADING_EXPENSES
        })
    }
}

const expensesError = (errMess) => {
    return (dispatch) => {
        dispatch({
            type: EXPENSES_ERROR,
            payload: errMess
        })
    }
}

const expenseCRUDError = (errMess, userid) => {
    return (dispatch) => {
        dispatch({
            type: EXPENSE_CRUD_ERROR,
            payload: errMess
        })
        setTimeout(() => {
            dispatch(fetchExpenses(userid));
        }, 3000);
    }
}