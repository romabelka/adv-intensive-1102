import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { eventListSelector, fetchAllEvents } from '../../redux/ducks/events'

export function EventList({ events, fetchAll }) {
  useEffect(() => {
    fetchAll()
  }, [fetchAll])

  return (
    <ul>
      {events.map((ev) => (
        <li key={ev.id} data-test-id="event-row">
          {ev.title}
        </li>
      ))}
    </ul>
  )
}

export default connect(
  (state) => ({
    events: eventListSelector(state)
  }),
  { fetchAll: fetchAllEvents }
)(EventList)
