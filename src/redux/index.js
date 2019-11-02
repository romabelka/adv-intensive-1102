import { createStore, applyMiddleware } from 'redux'
import { routerMiddleware } from 'connected-react-router'
import logger from 'redux-logger'
import createSagaMiddleware from 'redux-saga'
import reducer from './reducer'
import history from '../history'
import rootSaga from './saga'

export default function initStore(initialState) {
  const sagaMiddleware = createSagaMiddleware()

  const enhancer = applyMiddleware(
    routerMiddleware(history),
    sagaMiddleware,
    logger
  )

  const store = createStore(reducer, enhancer, initialState)

  sagaMiddleware.run(rootSaga)

  return store
}
