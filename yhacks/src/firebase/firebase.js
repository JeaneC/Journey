import * as firebase from 'firebase';

const config = {
  apiKey: "AIzaSyBLNQIpZ-wEAg4KYhsdTEqI90KJmKLZiJ4",
  authDomain: "yhackfb.firebaseapp.com",
  databaseURL: "https://yhackfb.firebaseio.com",
  projectId: "yhackfb",
  storageBucket: "yhackfb.appspot.com",
  messagingSenderId: "263320322292"
};

firebase.initializeApp(config);


const provider = new firebase.auth.FacebookAuthProvider();

// firebase.initializeApp(config);
const database = firebase.database()
const mainRef = database.ref('Main');

export const getSecretMessages = async() => {
  return await database.ref('Messages/SecretMessages/').once('value')
    .then(snapshot => {
      return snapshot.val()
    })
}

export const setMessage = (message) => {
  database.ref(`Messages/Message1`).set(message)
}

export { mainRef, database, provider, firebase }
