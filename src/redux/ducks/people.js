import { take, put, call } from 'redux-saga/effects'
import { appName } from '../../config'
import { Record } from 'immutable'
import { generateId } from '../utils'

/**
 * Constants
 * */
export const moduleName = 'people'
const prefix = `${appName}/${moduleName}`

export const ADD_PERSON_REQUEST = `${prefix}/ADD_PERSON_REQUEST`
export const ADD_PERSON_SUCCESS = `${prefix}/ADD_PERSON_SUCCESS`

/**
 * Reducer
 * */
export const ReducerRecord = Record({
  entities: []
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
        entities.concat(new PersonRecord(payload))
      )
    default:
      return state
  }
}

/**
 * Selectors
 * */

export const peopleList = (state) => state[moduleName].entities

/**
 * Action Creators
 * */

export const addPerson = ({ firstName, lastName, email }) => ({
  type: ADD_PERSON_REQUEST,
  payload: { firstName, lastName, email }
})

/**
 * Sagas
 * */

export function* addPersonSaga() {
  while (true) {
    const { payload } = yield take(ADD_PERSON_REQUEST)

    const id = yield call(generateId)

    yield put({
      type: ADD_PERSON_SUCCESS,
      payload: { ...payload, id }
    })
  }
}

export function* saga() {
  yield call(addPersonSaga)
}
