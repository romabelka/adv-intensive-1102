import { createStore, applyMiddleware } from 'redux'
import { routerMiddleware } from 'connected-react-router'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import reducer from './reducer'
import history from '../history'
import { init as initAuth } from './ducks/auth'

const enhancer = applyMiddleware(routerMiddleware(history), thunk, logger)

const store = createStore(reducer, enhancer)

initAuth(store)

export default store
