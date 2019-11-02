import { put, take, call } from 'redux-saga/effects'
import {
  addPersonSaga,
  addPerson,
  ADD_PERSON_SUCCESS,
  ADD_PERSON_REQUEST
} from './people'
import { generateId } from '../utils'

describe('People Duck', () => {
  describe('People Saga', () => {
    it('should add person', () => {
      const testPerson = {
        firstName: 'Roma',
        lastName: 'Yakobchuk',
        email: 'test@exmaple.com'
      }

      const action = addPerson(testPerson)

      const saga = addPersonSaga(action)

      expect(saga.next().value).toEqual(take(ADD_PERSON_REQUEST))

      expect(saga.next(action).value).toEqual(call(generateId))

      const id = 'some-test-id' //generateId()

      expect(saga.next(id).value).toEqual(
        put({
          type: ADD_PERSON_SUCCESS,
          payload: { ...testPerson, id }
        })
      )

      expect(saga.next().value).toEqual(take(ADD_PERSON_REQUEST))
    })
  })
})
