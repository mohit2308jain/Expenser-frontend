import { BUDGET_ERROR, FETCH_BUDGET, LOADING_BUDGET } from './Actions';

const initialState = {
    isLoading: true,
    errMess: null,
    budget: 0 
}

export const budgetReducer = (state = initialState, action) => {
    switch(action.type){
        case LOADING_BUDGET:
            return {...state, isLoading: true, errMess: null, budget: 0 }
        case BUDGET_ERROR:
            return {...state, isLoading: false, errMess: action.payload }
        case FETCH_BUDGET:
            return {...state, isLoading: false, errMess: null, budget: action.payload}
        default:
            return state;
    }
}