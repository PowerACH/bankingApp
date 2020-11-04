import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import authReducer from '../reducers/auth';
import errorsReducer from '../reducers/errors';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    combineReducers({
        auth: authReducer,
        errors: errorsReducer //when we call getErrors function to dispatch GET_ERRORS action from initiateLogin function, it will call the reducer and the error will be added to the redux store
    }),
    composeEnhancers(applyMiddleware(thunk))
);

export default store;