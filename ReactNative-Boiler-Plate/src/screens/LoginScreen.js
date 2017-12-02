import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-elements';
import { expo } from 'expo'
import axios from 'axios';

import { connect } from 'react-redux'
import { loginFacebook, storeToken } from '../actions/';

import loginBtn from '../assets/images/login-btn.png';

class LoginScreen extends Component {
  componentDidMount() {
    // this.props.navigation.navigate('map')
  }

  logIn = async () => {
    console.log('called')
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
      this.props.navigation.navigate('second')
    }
  }

  check = () => {
    console.log('helloworld')
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{ flex: 5 }}/>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <TouchableOpacity onPress={this.logIn}>
            <Image source={loginBtn} />
          </TouchableOpacity>
        </View>
        <View style ={{ flex: 1}} />
      </View>
    )
  }
}

const styles = {
  container : {
    flex : 1,
    backgroundColor: '#3B5998',
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    loginFacebook: (data) => { dispatch(loginFacebook(data)) },
    storeToken: (data) => { dispatch(storeToken(data)) },
  }
}

export default connect(null, mapDispatchToProps)(LoginScreen);
