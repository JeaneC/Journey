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

const database = firebase.database()


export const getEventInfo = async (eventId) => {
  return await database.ref(`events/${eventId}/`).once('value')
    .then(snapshot => {
      console.log(snapshot)
      return snapshot.val()
    })
}

export const getEvents = async (eventId) => {
  return await database.ref(`events/`).once('value')
    .then(snapshot => {
      console.log(snapshot)
      return snapshot.val()
    })
}

export const getJourneys = async (eventId) => {
  return await database.ref(`events/journeys`).once('value')
    .then(snapshot => {
      return snapshot.val()
    })
}


export const updateEvents = async (events) => {
  database.ref(`events/`).set(events);
}

export const updatePlayerTurn = async (eventId, val) => {
  database.ref(`events/${eventId}/currentPlayer`).set(val);
}

export const updateCurrentTurn = async (eventId, val) => {
  database.ref(`events/${eventId}/currentTurn`).set(val);
}

export const setMarkers = (eventId, markers) => {
  database.ref(`events/${eventId}/markers`).set(markers);
}

export const setPolylines = (eventId, polylines) => {
  database.ref(`events/${eventId}/polylines`).set(polylines);
}

export const setJourneys = (eventId, journeys) => {
  database.ref(`events/${eventId}/journeys`).set(journeys);
}




export { database }
