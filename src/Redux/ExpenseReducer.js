import { EXPENSES_ERROR, LOADING_EXPENSES, FETCH_EXPENSES } from './Actions';

const initialState = {
    isLoading: true,
    errMess: null,
    expenses : []
}

export const expenseReducer = (state = initialState, action) => {
    switch(action.type){
        case LOADING_EXPENSES:
            return {...state, isLoading: true, errMess: null, expenses: []}
        case EXPENSES_ERROR:
            return {...state, isLoading: false, errMess: action.payload }
        case FETCH_EXPENSES:
            return {...state, isLoading: false, errMess: null, expenses: action.payload}
        default:
            return state;
    }
}