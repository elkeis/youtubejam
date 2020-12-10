import {
    combineReducers,
    createStore,
    applyMiddleware,
    compose,
} from 'redux';
import thunk from 'redux-thunk';
import playlist from './playlist';
import upload from './upload';

export default createStore(
    combineReducers({ playlist, upload }),
    compose(
        applyMiddleware(thunk),
        window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
    )
);