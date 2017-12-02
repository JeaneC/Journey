import * as firebase from 'firebase';

const config = {};

firebase.initializeApp(config);
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

export { mainRef, database }
