import React, { Component } from 'react'
import { View, Text } from 'react-native'
import styled from 'styled-components/native'

import { connect } from 'react-redux'
import uiid from 'uuid';


class createEventScreen extends Component {
  componentDidMount() {
    const eventId = uuid.v1()
    console.log(eventId)
  }
  render() {
    return (
      <View>
        <Text>
          Create Event Screen
        </Text>
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {

  }
}

export default connect(mapStateToProps)(createEventScreen)
