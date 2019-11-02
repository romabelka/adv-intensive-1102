import React from 'react'
import { Formik, Form, Field } from 'formik'
import { useDispatch } from 'react-redux'
import { addPerson } from '../../redux/ducks/people'

function PeopleForm(props) {
  const dispatch = useDispatch()
  const onSubmit = (values) => dispatch(addPerson(values))
  return (
    <Formik
      initialValues={{ firstName: '', lastName: '', email: '' }}
      onSubmit={onSubmit}
    >
      <Form>
        <div>
          FirstName: <Field name="firstName" />
        </div>
        <div>
          LastName: <Field name="lastName" />
        </div>
        <div>
          Email: <Field name="email" />
        </div>
        <button type="submit">Add Person</button>
      </Form>
    </Formik>
  )
}

export default PeopleForm
