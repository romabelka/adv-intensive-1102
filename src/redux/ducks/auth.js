import { put, call, take, select, delay, all } from 'redux-saga/effects'
import { eventChannel } from 'redux-saga'
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
export const SIGN_UP_ERROR_LIMIT = `${prefix}/SIGN_UP_ERROR_LIMIT`

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

export const authLoadingSelector = (state) => state[moduleName].loading

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

export function* signUpSaga() {
  let attempts = 0
  while (true) {
    if (attempts === 3) yield delay(1000)
    if (attempts >= 5) {
      return yield put({
        type: SIGN_UP_ERROR_LIMIT
      })
    }

    const action = yield take(SIGN_UP_REQUEST)
    const { email, password } = action.payload
    const isLoading = yield select(authLoadingSelector)

    if (isLoading) continue

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
      attempts++
      yield put({
        type: SIGN_UP_ERROR,
        error
      })
    }
  }
}

const createAuthChannel = () =>
  eventChannel((emit) => apiService.onAuthChange((user) => emit({ user })))

export function* watchAuthStateSaga() {
  const channel = yield call(createAuthChannel)

  const { user } = yield take(channel)

  if (user) {
    yield put({
      type: SIGN_IN_SUCCESS,
      payload: { user }
    })
  }
}

export function* saga() {
  yield all([signUpSaga(), watchAuthStateSaga()])
}
