import firebase from 'firebase/app'
import 'firebase/auth'

import { firbaseConfig } from '../config'

class APIService {
  constructor() {
    this.fb = firebase
    this.fb.initializeApp(firbaseConfig)
  }

  signUp = (email, password) =>
    this.fb.auth().createUserWithEmailAndPassword(email, password)
}

export default new APIService()
