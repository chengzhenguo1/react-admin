import {
 createStore, Reducer, combineReducers, Middleware, compose, applyMiddleware,
} from 'redux'
import reduxThunk from 'redux-thunk'
import reduxLogger from 'redux-logger'
import { IAction, IStoreState } from './type'
import userReducer from './module/user'
import appReducer from './module/app'

const reducers: Reducer<IStoreState, IAction<any>> = combineReducers<IStoreState>({
    user: userReducer,
    app: appReducer,
})

const middleware: Middleware[] = [reduxThunk]

if (process.env.NODE_ENV === 'development') {
    middleware.push(reduxLogger)
}

function createMyStore() {
    const store = window.__REDUX_DEVTOOLS_EXTENSION__
    ? createStore(
        reducers,
        compose(applyMiddleware(...middleware), window.__REDUX_DEVTOOLS_EXTENSION__({})),
      )
    : createStore(reducers, applyMiddleware(...middleware))

  return store
}

const store = createMyStore()

export default store
