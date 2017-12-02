import React from 'react';
import { Text, View } from 'react-native';

const EventBox = ( props ) => {
  return (
    <View style={{ flex: 1, justifyContent: 'space-between', paddingLeft: 20, paddingRight: 20 }}>
      <Text style={{ flex: 1}} >Judging</Text>
      <Text style={{ flex: 1}}>Dec 3, 2017</Text>
    </View>
  )
}

export default EventBox;
