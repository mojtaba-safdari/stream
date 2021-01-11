import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga"
import { reducer as formReducer } from 'redux-form'
import reducer from "./reducer";
import sagaApi from "./saga"

const rootReducer = combineReducers({
  current: reducer,
  form: formReducer
})

const sagaMiddleware = createSagaMiddleware()
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(sagaMiddleware)))
sagaMiddleware.run(sagaApi)

export default store