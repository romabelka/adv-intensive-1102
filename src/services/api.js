import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

import { firbaseConfig } from '../config'

class APIService {
  constructor() {
    this.fb = firebase
    this.fb.initializeApp(firbaseConfig)
  }

  signIn = (email, password) =>
    this.fb.auth().signInWithEmailAndPassword(email, password)
  signUp = (email, password) =>
    this.fb.auth().createUserWithEmailAndPassword(email, password)

  fetchAllEvents = () =>
    this.fb
      .firestore()
      .collection('events')
      .get()
      .then(resToEntities)

  loadAllPeople = () =>
    this.fb
      .firestore()
      .collection('people')
      .get()
      .then((res) => res.docs.map((doc) => ({ ...doc.data(), id: doc.id })))

  addPerson = (person) =>
    this.fb
      .firestore()
      .collection('people')
      .add(person)

  onAuthChange = (callback) => this.fb.auth().onAuthStateChanged(callback)
}

function resToEntities(res) {
  return res.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
}

export default new APIService()
