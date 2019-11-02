import React, { Component } from 'react'
import PeopleList from '../people/people-list'
import EventList from '../events/event-list'

class AdminPage extends Component {
  static propTypes = {}

  render() {
    return (
      <div>
        <h1>Admin</h1>
        <PeopleList />
        <EventList />
      </div>
    )
  }
}

export default AdminPage
