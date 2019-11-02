import React, { Component } from 'react'
import PeopleList from '../people/people-list'

class AdminPage extends Component {
  static propTypes = {}

  render() {
    return (
      <div>
        <h1>Admin</h1>
        <PeopleList />
      </div>
    )
  }
}

export default AdminPage
