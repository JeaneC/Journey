import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import { database, setMessage, getSecretMessages } from '../firebase/firebase';

import { connect } from 'react-redux'
import axios from 'axios';

const FBSDK = require('react-native-fbsdk');
const {
  GraphRequest,
  GraphRequestManager,
} = FBSDK;

class SecondScreen extends Component {

  getFirebaseStuff = async () => {
    let firebasePromise = await getSecretMessages()
    console.log(firebasePromise)
  }

  getFriendsWithApp = async () => {
    // https://graph.facebook.com/v2.11/search?type=place&{parameters}&fields={place information}
    console.log(this.props)
    // const token = this.props.token
    const token = "EAAfhqzyLHEABAOPaEmtEDCM5YWlCZCDBjCG2IyFVimGclVtEMCZCmpDlubSjFiUMxalhKqWcBSw9i80dyXFGN4hQYHDRoFtUipnIxsKYKArJI4weQ3ZAFXYbN4lz1i0UI14tRpNBQZCHLAT60apm8Ii5CqjHBJgFc6v97safIv1egGIxJtS2hpMbqFxwp9ZCZCFmaGFXSZBUaLqIAqYVxz7";
    const latitude = 40.72004412623778;
    const longitude = -73.8111714306203
    const center = `${latitude},${longitude}`
    const radius = 1000;
    const ROOT_URL = "https://graph.facebook.com/v2.11/search?type=place&"
    const categories = "['EDUCATION']";
    const midQuery = `center=${center}&distance=${radius}`


    //ARTS_ENTERTAINMENT, EDUCATION, FITNESS_RECREATION, FOOD_BEVERAGE, HOTEL_LODGING, MEDICAL_HEALTH, SHOPPING_RETAIL, TRAVEL_TRANSPORTATION.
    const query = `${ROOT_URL}${midQuery}&fields=name,picture&access_token=${token}&categories=${categories}`
    console.log(query)
    const response = await axios.get(query)
    const { data } = response.data
    console.log(data)
  }

  getTrueFriends = async () => {
    const token = "EAACEdEose0cBAPWXzewm7GHUWClwO5AfgmmRRjhc3XVZC4WoP1AOnMLkkEVa1CTyXdKI1zzEICwtCCVqjW8hkO0ZC2BPzooJ0mjVslqNuIl8MKTRfkKQzogXSiiiXhaf20ZCZA9Sr7YEpp7cE4DxXZBugrq6xbCfu4sJq6ZBdDlqYC8vKPnREyUCfcgmeIYYoZD"
    const ROOT_URL = "https://graph.facebook.com/v2.11/"
    const query = `${ROOT_URL}/1637485562938133/friendlists?access_token=${token}`

    const response = await axios.get(query)
    console.log(response)
    const { data } = response.data
    console.log(data)
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{ flex: 4 }} />
        <Button
          large
          title='Get Places'
          buttonStyle={styles.button}
          backgroundColor='red'
          onPress={() => this.getFriendsWithApp()}
        />
        <Button
          large
          title='Get Friends'
          buttonStyle={styles.button}
          onPress={() => this.getTrueFriends()}
          backgroundColor='green'
        />
        <Button
          large
          title='Next Screen'
          buttonStyle={styles.button}
          onPress={() => this.props.navigation.navigate('third')}
          backgroundColor='black'
        />
        <View style={{ flex: 4}} />
      </View>
    )
  }
}

const styles = {
  container : {
    flex : 1,
    backgroundColor: 'blue'
  },
  text1 : {
    color : 'white',
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold'
  },
  button : {
    marginBottom: 10
  }
}

const mapStateToProps = (state) => {
  console.log('Second SecondScreen')
  console.log(state)
  const { token } = state.main
  return { token }
}

export default connect(mapStateToProps)(SecondScreen);
