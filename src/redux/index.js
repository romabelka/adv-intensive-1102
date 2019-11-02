import { createStore, applyMiddleware } from 'redux'
import { routerMiddleware } from 'connected-react-router'
import logger from 'redux-logger'
import createSagaMiddleware from 'redux-saga'
import reducer from './reducer'
import history from '../history'
import { init as initAuth, saga as authSaga } from './ducks/auth'

const sagaMiddleware = createSagaMiddleware()

const enhancer = applyMiddleware(
  routerMiddleware(history),
  sagaMiddleware,
  logger
)

const store = createStore(reducer, enhancer)

sagaMiddleware.run(authSaga)

initAuth(store)

export default store
