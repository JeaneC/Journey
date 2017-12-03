import React from 'react';
import { Text, View } from 'react-native';
import styled from 'styled-components/native'

const EventBox = ({event}) => {
  return (
    <View style={style.containerStyle}>
      <Text style={{ flex: 1}} >{event.title}</Text>
      <Text style={{ flex: 1}}>{event.date}</Text>
    </View>
  )
}

const style = {
  containerStyle: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#ddd',
    borderBottomWidth: 0,
    shadowColor: '#bdc3c7',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 1,
    elevation: 1,
    marginLeft: 15,
    marginRight: 15,
    paddingLeft: 15,
    marginTop: 20,
  }
}

export default EventBox;
