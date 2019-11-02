import React from 'react'
import { useSelector } from 'react-redux'
import PeopleForm from './people-form'
import { peopleList } from '../../redux/ducks/people'

function PeopleList(props) {
  const people = useSelector(peopleList)

  return (
    <div>
      <ul>
        {people.map((person) => (
          <li key={person.id}>{person.email}</li>
        ))}
      </ul>
      <PeopleForm />
    </div>
  )
}

export default PeopleList
