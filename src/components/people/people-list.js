import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PeopleForm from './people-form'
import { fetchAllPeople, peopleList } from '../../redux/ducks/people'

function PeopleList(props) {
  const dispatch = useDispatch()
  const people = useSelector(peopleList)
  useEffect(() => {
    dispatch(fetchAllPeople())
  }, [dispatch])

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
