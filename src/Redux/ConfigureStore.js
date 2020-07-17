import { registration } from './RegisterReducer';
import { userReducer } from './UserReducer';
import { combineReducers } from 'redux';

export default combineReducers({
    registration: registration,
    userReducer: userReducer
})