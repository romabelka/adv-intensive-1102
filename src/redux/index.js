import { createStore, applyMiddleware } from 'redux'
import { routerMiddleware } from 'connected-react-router'
import logger from 'redux-logger'
import createSagaMiddleware from 'redux-saga'
import reducer from './reducer'
import history from '../history'
import rootSaga from './saga'
import { init as initAuth } from './ducks/auth'

export default function initStore(initialState) {
  const sagaMiddleware = createSagaMiddleware()

  const enhancer = applyMiddleware(
    routerMiddleware(history),
    sagaMiddleware
    //        logger
  )

  const store = createStore(reducer, enhancer, initialState)

  sagaMiddleware.run(rootSaga)

  initAuth(store)

  return store
}
