import {createStore, combineReducers, compose, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import { authReducer } from './ducks/authDucks';
import { calendarReducer } from './ducks/calendarDucks';
import { uiReducer } from './ducks/uiDucks';


const rootReducer = combineReducers({
    ui: uiReducer,
    calendar: calendarReducer,
    auth: authReducer
    //TODO: CalendarReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;           //Esto siempre es igual y es para utilizar la extensiòn de Google Chrome de Redux

export const store = createStore(
    rootReducer,
    composeEnhancers( applyMiddleware( thunk ) )
)
