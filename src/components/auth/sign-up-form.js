import React from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import { connect } from 'react-redux'
import { signUp } from '../../redux/ducks/auth'

function SignUpForm({ onSubmit }) {
  return (
    <Formik initialValues={{ email: '', password: '' }} onSubmit={onSubmit}>
      {(fomikBag) => {
        console.log('---', fomikBag)
        return (
          <Form>
            <h3>Sign Up Form</h3>
            <div>
              Email:{' '}
              <Field
                name="email"
                validate={(value) => (!value ? 'Required Field' : undefined)}
              />
              <ErrorMessage name="email" />
            </div>
            <div>
              Password: <Field name="password" type="password" />
            </div>
            <button type="submit">Sign Up</button>
          </Form>
        )
      }}
    </Formik>
  )
}

export default connect(
  null,
  (dispatch) => ({
    onSubmit: ({ email, password }) => dispatch(signUp(email, password))
  })
)(SignUpForm)
