import React, { Component } from 'react'
import { NavLink, Route } from 'react-router-dom'
import SignInForm from '../auth/sign-in-form'
import SignUpForm from '../auth/sign-up-form'

class AuthPage extends Component {
  static propTypes = {}

  render() {
    return (
      <div>
        <h1>Auth Page</h1>
        <div>
          <NavLink to="/auth/sign-up" activeStyle={{ color: 'red' }}>
            Sign Up
          </NavLink>
          <NavLink to="/auth/sign-in" activeStyle={{ color: 'red' }}>
            Sign In
          </NavLink>
        </div>
        <Route path="/auth/sign-in" component={SignInForm} />
        <Route path="/auth/sign-up" component={SignUpForm} />
      </div>
    )
  }
}

export default AuthPage
