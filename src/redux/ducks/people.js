import {
  take,
  put,
  call,
  spawn,
  all,
  delay,
  fork,
  cancel,
  cancelled,
  race
} from 'redux-saga/effects'
import { appName } from '../../config'
import { List, Record } from 'immutable'
import apiService from '../../services/api'
import { fbToEntities } from '../../services/utils'

/**
 * Constants
 * */
export const moduleName = 'people'
const prefix = `${appName}/${moduleName}`

export const ADD_PERSON_REQUEST = `${prefix}/ADD_PERSON_REQUEST`
export const ADD_PERSON_SUCCESS = `${prefix}/ADD_PERSON_SUCCESS`

export const FETCH_ALL_REQUEST = `${prefix}/FETCH_ALL_REQUEST`
export const FETCH_ALL_SUCCESS = `${prefix}/FETCH_ALL_SUCCESS`

/**
 * Reducer
 * */
export const ReducerRecord = Record({
  entities: new List()
})

const PersonRecord = Record({
  id: null,
  firstName: '',
  lastName: '',
  email: ''
})

export default function reducer(state = new ReducerRecord(), action) {
  const { type, payload } = action

  switch (type) {
    case FETCH_ALL_SUCCESS:
      return state.set('entities', fbToEntities(payload, PersonRecord))

    default:
      return state
  }
}

/**
 * Selectors
 * */

export const peopleList = (state) => state[moduleName].entities.toArray()

/**
 * Action Creators
 * */

export const addPerson = ({ firstName, lastName, email }) => ({
  type: ADD_PERSON_REQUEST,
  payload: { firstName, lastName, email }
})

export const fetchAllPeople = () => ({
  type: FETCH_ALL_REQUEST
})

/**
 * Sagas
 * */

export function* addPersonSaga() {
  while (true) {
    const { payload } = yield take(ADD_PERSON_REQUEST)

    try {
      const { id } = yield call(apiService.addPerson, payload)

      yield put({
        type: ADD_PERSON_SUCCESS,
        payload: { ...payload, id }
      })
    } catch (error) {
      console.log('---', error)
    }
  }
}

export function* fetchAllSaga() {
  const data = yield call(apiService.fetchAllPeople)

  yield put({
    type: FETCH_ALL_SUCCESS,
    payload: data
  })
}

export function* syncAllWithPolling() {
  try {
    while (true) {
      yield fork(fetchAllSaga)
      //yield call(fetchAllSaga)
      yield delay(2000)
    }
  } finally {
    if (yield cancelled()) {
      console.log('---', 'saga has been canceled')
    }
  }
}

/*
export function* cancellableSyncSaga() {
  const process = yield fork(syncAllWithPolling)

  yield delay(5000)

  yield cancel(process)
}
*/

export function* cancellableSyncSaga() {
  yield race({
    sync: syncAllWithPolling(),
    delay: delay(5000)
    //   routeChanged: wathRouteChangeSaga(),
    //    stopBtn: watchStopSyncSaga(),
    //    signOut: wathAuthorizedSaga()
  })
}

export function* exponentialRetrySaga(fetchSaga) {
  for (let i = 0; i < 5; i++) {
    try {
      return yield call(fetchSaga)
    } catch (e) {
      yield delay(1000 * Math.pow(2, i))
    }
  }
}

export function* saga() {
  yield spawn(cancellableSyncSaga)

  yield all([addPersonSaga()])
}
