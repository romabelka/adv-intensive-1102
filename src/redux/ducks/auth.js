import { appName } from '../../config'
import { Record } from 'immutable'
import apiService from '../../services/api'

/**
 * Constants
 * */
export const moduleName = 'auth'
const prefix = `${appName}/${moduleName}`

export const SIGN_UP_START = `${prefix}/SIGN_UP_START`
export const SIGN_UP_SUCCESS = `${prefix}/SIGN_UP_SUCCESS`
export const SIGN_UP_ERROR = `${prefix}/SIGN_UP_ERROR`

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

export const signUp = (email, password) => async (dispatch) => {
  dispatch({
    type: SIGN_UP_START
  })

  try {
    const user = await apiService.signUp(email, password)

    dispatch({
      type: SIGN_UP_SUCCESS,
      payload: { user }
    })
  } catch (error) {
    dispatch({
      type: SIGN_UP_ERROR,
      error
    })
  }
}
