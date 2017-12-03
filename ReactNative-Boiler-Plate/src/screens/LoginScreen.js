import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-elements';
import { expo } from 'expo'
import axios from 'axios';

import { connect } from 'react-redux'
import { loginFacebook, storeToken } from '../actions/';

import loginBtn from '../assets/images/login-btn.png';
import backgroundPhoto from '../assets/images/sign-in-bg.png';

import { getEvents } from '../firebase/firebase';
import { updateEvents } from '../actions/index';

class LoginScreen extends Component {
  componentDidMount() {
    this.props.navigation.navigate('event')
    // this.props.navigation.navigate('map')
    // this.props.navigation.navigate('second')
  }

  logIn = async () => {

    // console.log('called')
    const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync('2218450408381504', {
        permissions: ['public_profile'],
      });

    if (type === 'success') {
      // Get the user's name using Facebook's Graph API
      const response = await fetch(
        `https://graph.facebook.com/me?access_token=${token}`);
      const url = response.url
      const userData = await axios.get(url)
      const { data } = userData

      const hold = await this.props.loginFacebook(data)


      const events = await getEvents()
      this.props.updateEvents(events)
      //Before navigating to second - pull all events
      //WE NEED TO GO TO EVENT NEXT
      this.props.navigation.navigate('event')
      // this.props.navigation.navigate('map')
    }
  }

  check = () => {
    console.log('helloworld')
  }

  render() {
    return (
      <Image source={backgroundPhoto} style={styles.imageContainer}>
        <TouchableOpacity onPress={this.logIn} style={styles.buttonContainer}>
            <Image source={loginBtn} />
        </TouchableOpacity>
      </Image>
    )
  }
}

const styles = {
  container : {
    flex : 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 30,
    justifyContent: 'center',
    alignItems: 'center'
  },
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    loginFacebook: (data) => { dispatch(loginFacebook(data)) },
    storeToken: (data) => { dispatch(storeToken(data)) },
    updateEvents: (data) => { dispatch(updateEvents(data)) },
  }
}

export default connect(null, mapDispatchToProps)(LoginScreen);
