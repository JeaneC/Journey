import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-elements';
import { expo } from 'expo'

import loginBtn from '../assets/images/login-btn.png';

class LoginScreen extends Component {

  logIn = async () => {
    console.log('called')
    const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync('2218450408381504', {
        permissions: ['public_profile'],
      });
    if (type === 'success') {
      // Get the user's name using Facebook's Graph API
      const response = await fetch(
        `https://graph.facebook.com/me?access_token=${token}`);
      console.log(response);
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

export default LoginScreen;