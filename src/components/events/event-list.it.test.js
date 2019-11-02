import EventList from './event-list'
import React from 'react'
import createDriver from './event-list.driver'
import { Provider } from 'react-redux'
import createStore from '../../redux'
import mocks from '../../mocks/conferences'
import eventually from 'wix-eventually'

jest.mock('../../services/api', () => ({
  fetchAllEvents: () =>
    Promise.resolve(
      mocks.map((ev, index) => ({ ...ev, id: index.toString() }))
    ),
  onAuthChange: () => {}
}))

describe('Integration EventList Test', () => {
  let driver

  afterEach(() => {
    driver && driver.unmount()
  })

  it('should fetch events', async () => {
    const store = createStore()
    driver = createDriver(
      <Provider store={store}>
        <EventList />
      </Provider>
    )

    await eventually(() => {
      //todo fix check
      expect(store.getState().events.entities.size).toBe(mocks.length)
    })
  })
})
