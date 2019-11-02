import { put, call, takeEvery } from 'redux-saga/effects'
import { appName } from '../../config'
import { Record } from 'immutable'
import apiService from '../../services/api'

/**
 * Constants
 * */
export const moduleName = 'auth'
const prefix = `${appName}/${moduleName}`

export const SIGN_UP_REQUEST = `${prefix}/SIGN_UP_REQUEST`
export const SIGN_UP_START = `${prefix}/SIGN_UP_START`
export const SIGN_UP_SUCCESS = `${prefix}/SIGN_UP_SUCCESS`
export const SIGN_UP_ERROR = `${prefix}/SIGN_UP_ERROR`

export const SIGN_IN_SUCCESS = `${prefix}/SIGN_IN_SUCCESS`

/**
 * Reducer
 * */
export const ReducerRecord = Record({
  loading: false,
  error: null,
  user: null
})

export default function reducer(state = new ReducerRecord(), action) {
  const { type, payload, error } = action

  switch (type) {
    case SIGN_UP_START:
      return state.set('loading', true).set('error', null)

    case SIGN_UP_SUCCESS:
    case SIGN_IN_SUCCESS:
      return state.set('loading', false).set('user', payload.user)

    case SIGN_UP_ERROR:
      return state.set('loading', false).set('error', error)

    default:
      return state
  }
}

/**
 * Selectors
 * */

/**
 * Action Creators
 * */

export const signUp = (email, password) => ({
  type: SIGN_UP_REQUEST,
  payload: { email, password }
})

/**
 * Sagas
 */

export function* signUpSaga(action) {
  const { email, password } = action.payload

  yield put({
    type: SIGN_UP_START
  })

  try {
    const user = yield call(apiService.signUp, email, password)

    yield put({
      type: SIGN_UP_SUCCESS,
      payload: { user }
    })
  } catch (error) {
    yield put({
      type: SIGN_UP_ERROR,
      error
    })
  }
}

export function* saga() {
  yield takeEvery(SIGN_UP_REQUEST, signUpSaga)
}

/**
 *   INIT
 **/

export function init(store) {
  apiService.onAuthChange((user) => {
    if (user) {
      store.dispatch({
        type: SIGN_IN_SUCCESS,
        payload: { user }
      })
    }
  })
}
