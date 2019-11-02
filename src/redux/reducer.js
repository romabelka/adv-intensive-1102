import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import authReducer, { moduleName as authModule } from './ducks/auth'
import peopleReducer, { moduleName as peopleModule } from './ducks/people'
import history from '../history'

export default combineReducers({
  router: connectRouter(history),
  [authModule]: authReducer,
  [peopleModule]: peopleReducer
})
