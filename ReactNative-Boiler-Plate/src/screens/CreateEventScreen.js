import React, { Component } from 'react'
import { View, Text, ScrollView, TouchableOpacity, Image, TextInput } from 'react-native'
import styled from 'styled-components/native'

import { connect } from 'react-redux'

import checkIcon from '../assets/images/check.png';

import user from '../assets/tabbar/user.png';
import map from '../assets/tabbar/map.png';
import calendar from '../assets/tabbar/calendar.png';

import { updateEvents } from '../firebase/firebase';

import user0 from '../assets/events/profiles/0.png';
import user1 from '../assets/events/profiles/1.png';
import user3 from '../assets/events/profiles/3.png';

import backArrow from '../assets/images/back_white.png';

import { Calendar, CalendarList, Agenda } from 'react-native-calendars';

const uuidv4 = require('uuid/v4');

class CreateEventScreen extends Component {
  constructor(props) {
    super(props)

    this.state = {
      events: this.props.events ? this.props.events : {},
      title: "John's Hangout",
      startdate: "December 3, 2017",
      numberOfTurns: "7",
      description: 'Hangout with Friends'
    }

    console.log('Check events', this.props.events)
  }

  finishEvent = () => {
    const random = uuidv4()
    const newEvent = {
      currentPlayer: 0,
      currentTurn: 0,
      numberOfTurns: this.state.numberOfTurns,
      date: this.state.startdate,
      description: this.state.description,
      title: this.state.title
    }
    let newEvents = {...this.state.events}
    newEvents[random] = newEvent;
    updateEvents(newEvents)
    this.props.navigation.goBack()
    //Add to firebase
    //Set new event id in redux
    //Go to mapview

  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.navBar}>
          <TouchableOpacity style={{ flex: 1}} onPress={() => this.props.navigation.goBack()}>
            <Image source={backArrow} style={{ marginLeft: 20, width: 20, height: 18 }}/>
          </TouchableOpacity>
          <Text style={{ flex: 4 , fontSize: 22, color: "white", textAlign: 'center'}}>Events</Text>
          <TouchableOpacity style={{ flex: 1, }} onPress={this.finishEvent}>
            <Image source={checkIcon} style={{ marginLeft: 10, width: 20, height: 18}}/>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1, marginBottom: 20, backgroundColor: 'white'}} >
          <ScrollView>
            <Text style={styles.headerStyle}>Basic Info</Text>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(title) => this.setState({title})}
              value={this.state.title}
            />
            <Text style={styles.headerStyle}>Description</Text>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(description) => this.setState({description})}
              value={this.state.description}
            />
            <Text style={styles.headerStyle}>Start Date</Text>
            <Calendar
            // Initially visible month. Default = Date()
            // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
            minDate={'2017-05-10'}
            // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
            maxDate={'2018-05-30'}
            // Handler which gets executed on day press. Default = undefined
            onDayPress={(day) => {this.setState({startdate : day})}}
            // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
            monthFormat={'MM-dd-yyyy'}
            // Handler which gets executed when visible month changes in calendar. Default = undefined
            onMonthChange={(month) => {console.log('month changed', month)}}
            // Hide month navigation arrows. Default = false
            hideArrows={true}
            // Replace default arrows with custom ones (direction can be 'left' or 'right')
            renderArrow={(direction) => (<Arrow />)}
            // Do not show days of other months in month page. Default = false
            hideExtraDays={true}
            // If hideArrows=false and hideExtraDays=false do not switch month when tapping on greyed out
            // day from another month that is visible in calendar page. Default = false
            disableMonthChange={true}
            // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
            firstDay={1}
            // Hide day names. Default = false
            hideDayNames={true}
            style={{padding: 10, marginTop: 5}}
          />
            <TextInput
              style={styles.inputStyle}
              onChangeText={(startdate) => this.setState({startdate})}
              value={this.state.startdate}
            />
            <Text style={styles.headerStyle}>Number of Turns</Text>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(numberOfTurns) => this.setState({numberOfTurns})}
              value={this.state.numberOfTurns}
            />
            <Text style={styles.headerStyle}>Invite Friends</Text>
            <View style={styles.friendStyle}>
              <Image source={user0} style={styles.profileStyle} />
              <Text>Harry Liu</Text>
            </View>
            <View style={styles.friendStyle}>
              <Image source={user1} style={styles.profileStyle} />
              <Text>Dorian Brown</Text>
            </View>
            <View style={styles.friendStyle}>
              <Image source={user3} style={styles.profileStyle} />
              <Text>Christian Lee</Text>
            </View>
          </ScrollView>
        </View>
        <View style={styles.botBar}>
          <TouchableOpacity style={styles.iconBox}>
            <Image source={calendar} style={styles.iconBox}/>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconBox}>
            <Image source={map} style={styles.iconBox} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconBox}>
            <Image source={user} style={styles.iconBox3} />
          </TouchableOpacity>
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
   marginTop: 15,
   paddingLeft: 20,
   fontSize: 18,
   fontWeight: 'bold'
 }
}

const mapStateToProps = state => {
  console.log(state.main)
  return {
    events: state.main.events
  }
}

export default connect(mapStateToProps)(CreateEventScreen)
