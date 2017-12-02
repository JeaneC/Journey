import * as firebase from 'firebase';

const config = {
  apiKey: "AIzaSyA0sjM8wfczGPsXXOWUcUdyzYay_wAyAEg",
  authDomain: "fir-test-b65e6.firebaseapp.com",
  databaseURL: "https://fir-test-b65e6.firebaseio.com",
  projectId: "fir-test-b65e6",
  storageBucket: "",
  messagingSenderId: "514634779566"
};

firebase.initializeApp(config);
const database = firebase.database()
const mainRef = database.ref('Main');

export const getAndUpdateTripNumber = async (uid) => {
  return await database.ref(`Users/${uid}/trips`).once('value')
    .then(snapshot => {
      database.ref(`Users/${uid}/trips`).set(snapshot.val() + 1)
      return snapshot.val() + 1
    })
}

export const getSecretMessages = async() => {
  return await database.ref('Messages/SecretMessages/').once('value')
    .then(snapshot => {
      return snapshot.val()
    })
}
export const setMessage = (message) => {
  database.ref(`Messages/Message1`).set(message)
}

export { mainRef, database }
