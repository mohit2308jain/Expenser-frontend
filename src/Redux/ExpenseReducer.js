import { EXPENSES_ERROR, LOADING_EXPENSES, FETCH_EXPENSES, EXPENSE_CRUD_ERROR } from './Actions';

const initialState = {
    isLoading: true,
    errMess: null,
    expenseErrMess: null,
    expenses : []
}

export const expenseReducer = (state = initialState, action) => {
    switch(action.type){
        case LOADING_EXPENSES:
            return {...state, isLoading: true, errMess: null, expenseErrMess: null, expenses: []}
        case EXPENSES_ERROR:
            return {...state, isLoading: false, errMess: action.payload, expenseErrMess: null }
        case EXPENSE_CRUD_ERROR:
            return {...state, isLoading: false, errMess: null, expenseErrMess: action.payload }
        case FETCH_EXPENSES:
            return {...state, isLoading: false, errMess: null, expenseErrMess: null, expenses: action.payload}
        default:
            return state;
    }
}