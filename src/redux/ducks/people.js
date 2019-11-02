import { take, put, call, takeEvery, all } from 'redux-saga/effects'
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
    case ADD_PERSON_SUCCESS:
      return state.update('entities', (entities) =>
        entities.push(new PersonRecord(payload))
      )

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
  const data = yield call(apiService.loadAllPeople)

  yield put({
    type: FETCH_ALL_SUCCESS,
    payload: data
  })
}

export function* saga() {
  yield all([takeEvery(FETCH_ALL_REQUEST, fetchAllSaga), addPersonSaga()])
}
