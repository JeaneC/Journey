import React, { Component } from 'react';
import { View, Text } from 'react-native';
import uid from 'uid';

class EventScreen extends Component {
  componentDidMount() {
    console.log(uid(10))
  }

  render(){
    return (
      <View>
        <Text>Event Screen</Text>
      </View>
    )
  }
}

export default EventScreen
