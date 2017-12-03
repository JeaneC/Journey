import React, { Component } from 'react'
import { View, Text, ScrollView, TouchableOpacity, Image, TextInput } from 'react-native'
import styled from 'styled-components/native'

import { connect } from 'react-redux'

import checkIcon from '../assets/images/check.png';

import user from '../assets/tabbar/user.png';
import map from '../assets/tabbar/map.png';
import calendar from '../assets/tabbar/calendar.png';

import { getJourneys, setJourneys } from '../firebase/firebase';

import user0 from '../assets/events/profiles/0.png';
import user1 from '../assets/events/profiles/1.png';
import user3 from '../assets/events/profiles/3.png';

const uuidv4 = require('uuid/v4');

class CategorySelectionScreen extends Component {
  constructor(props) {
    super(props)
    console.log('the journeys here are')
    console.log(this.props)

    this.state = {
      journeys : this.props.journeys
    }

  }

  finishEvent = async (journey) => {
    const journeys = await getJourneys();
    console.log('what happened')
    console.log(journeys)
    const trueJourney = journeys ? journeys : []
    const category = this.props.category;
    const region = this.props.region;
    const eventId = this.props.eventId;

    const journeyObject = { category, region, eventId }
    trueJourney.push(journeyObject)
    console.log(trueJourney)

    setJourneys(eventId, trueJourney)

    this.props.navigation.goBack()


  }

  componentDidMount() {
    const journeys = getJourneys()
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.navBar}>
          <View style={{ flex: 1 }}/>
          <Text style={{ flex: 4 , fontSize: 22, color: "white", textAlign: 'center'}}>{this.props.category}</Text>
          <View style={{ flex: 1}} />
        </View>
        <View style={{ flex: 1, marginBottom: 20}} >
          <ScrollView>
            {this.state.journeys.map((journey, index) => {
                return (
                  <TouchableOpacity key={index} onPress={() => this.finishEvent(journey.name)} style={styles.inputStyle}>
                      <Text style={styles.headerStyle}>{journey.name}</Text>
                  </TouchableOpacity>
                )
              })}
          </ScrollView>
        </View>

      </View>
    )
  }
}

const styles = {
  navBar: {
   flexDirection: 'row',
   backgroundColor: "#597bb5",
   paddingTop: 15,
   paddingBottom: 5,
   height: 65,
   justifyContent: 'center',
   alignItems: 'center'
 },
 botBar: {
   flexDirection: "row",
   alignItems: 'center',
   borderColor: "#d3d3d3",
   justifyContent: 'space-between',
   borderTopWidth: 1,
   height: 55,
 },
 iconBox : {
   flex: 1,
   justifyContent: 'center',
   alignItems: 'center',
   height: 25,
   width: 25
 },
 iconBox3 : {
   flex: 1,
   justifyContent: 'center',
   alignItems: 'center',
   height: 35,
   width: 25
 },
 inputStyle: {
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
    marginLeft: 25,
    marginRight: 25,
    paddingLeft: 15,
    marginTop: 20,

 },
 friendStyle: {
   height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#ddd',
    borderBottomWidth: 0,
    shadowColor: '#bdc3c7',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 1,
    elevation: 1,
    marginLeft: 25,
    marginRight: 25,
    paddingLeft: 15,
    marginTop: 20,
    display: 'flex',
    flexDirection: 'row'
 },
 profileStyle: {
   marginRight: 20,
 },
 headerStyle: {
   paddingTop: 10,
   paddingBottom: 10,
   fontSize: 18,
   fontWeight: 'bold',
   textAlign: 'center'
 }
}

const mapStateToProps = state => {

  return {
    journeys: state.main.results,
    category: state.main.category,
    region: state.main.region,
    eventId: state.main.eventId
  }
}

export default connect(mapStateToProps)(CategorySelectionScreen)
