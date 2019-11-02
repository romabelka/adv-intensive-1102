import React from 'react'
import mocks from '../../mocks/conferences'
import createDriver from './event-list.driver'
import { EventList } from './event-list'

const events = mocks.map((ev, index) => ({ ...ev, id: index.toString() }))

describe('EventList', () => {
  let driver

  afterEach(() => {
    driver && driver.unmount()
  })

  it('should render a list of events', () => {
    driver = createDriver(<EventList events={events} fetchAll={() => {}} />)
    expect(driver.get.rows.length).toBe(events.length)
  })

  it('should fetch events', () => {
    const fetchAll = jest.fn()

    driver = createDriver(<EventList events={[]} fetchAll={fetchAll} />)

    expect(fetchAll.mock.calls.length).toBe(1)
  })
})
