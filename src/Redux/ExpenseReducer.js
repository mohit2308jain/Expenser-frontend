import { EXPENSES_ERROR, LOADING_EXPENSES, FETCH_EXPENSES, 
    EXPENSE_CRUD_ERROR, EXPENSE_OPERATION_MESSAGE, REMOVE_MSGS } from './Actions';

const initialState = {
    isLoading: true,
    errMess: null,
    expenseErrMess: null,
    expenses : []
}

export const expenseReducer = (state = initialState, action) => {
    switch(action.type){
        case LOADING_EXPENSES:
            return {...state, isLoading: true, errMess: null, expenseErrMess: null, operationMsgs: null, expenses: []}
        case EXPENSES_ERROR:
            return {...state, isLoading: false, errMess: action.payload, expenseErrMess: null, operationMsgs: null }
        case EXPENSE_CRUD_ERROR:
            return {...state, isLoading: false, errMess: null, expenseErrMess: action.payload, operationMsgs: null }
        case EXPENSE_OPERATION_MESSAGE:
            return {...state, isLoading: false, errMess: null, operationMsgs: action.payload, expenseErrMess: null }
        case REMOVE_MSGS:
            return {...state, isLoading: false, errMess: null, operationMsgs: null, expenseErrMess: null }
        case FETCH_EXPENSES:
            return {...state, isLoading: false, errMess: null, expenseErrMess: null, expenses: action.payload, operationMsgs: null}
        default:
            return state;
    }
}