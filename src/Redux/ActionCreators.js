import { FETCH_BUDGET, FETCH_EXPENSE, FETCH_EXPENSES, 
    UPDATE_BUDGET, UPDATE_EXPENSE, DELETE_EXPENSE, ADD_EXPENSE} from './Actions';
import baseURL from '../baseUrl';

/*
export const registerUser = (user) => {
    return async (dispatch) => {
        dispatch(registrationLoading());

        try{
            const resp = await baseURL.post('/register', user)
            console.log(resp);
            dispatch({
                type: USER_REGISTERED,
                payload: true
            })
        }
        catch(err){
            console.log(err);
            dispatch(registrationError('Error'));
        }
    }
}

export const registrationLoading = () => ({
    type: REGISTRATION_LOADING
})

const registrationError = (errMess) => ({
    type: REGISTRATION_ERROR,
    payload: errMess
})

export const loginUser = (user) => {
    return async (dispatch) => {
        dispatch(loginLoading());

        try{
            const resp = await baseURL.post('/signin', user);

            dispatch({
                type: USER_LOGGED_IN,
                payload: resp.data
            })
        }
        catch(err){
            dispatch(loginError('err'));
        }
    }
}

export const loginLoading = () => ({
    type: LOGIN_LOADING
})

const loginError = (errMess) => ({
    type: LOGIN_ERROR,
    payload: errMess
})

*/