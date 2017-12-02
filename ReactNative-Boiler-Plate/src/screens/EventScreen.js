import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { connect } from 'react-redux'
import { Icon } from 'react-native-elements';

import EventBox from '../components/EventBox';
import user from '../assets/images/user.png';
import map from '../assets/images/map.png';
import calendar from '../assets/images/calendar.png';
import yhack from '../assets/images/yhack.png';

class EventScreen extends Component {
  state = {
    events: {
      "a" : {
        "title" : "Workshop",
        "date" : "December 3, 2017"
      },
      "b" : {
        "title" : "Judging",
        "date" : "December 3, 2017"
      },
    }
  }
  constructor(props) {
    super(props)


  }
  componentDidMount() {
    console.log('Event Screen Loaded')
  }
  renderEvents = () => {
    let keys = this.state.events
    console.log(keys)
    // console.log(this.state.events)
    // this.state.events.keys().map(key => {
    //   console.log(this.state.events[key])
    // })
  }
  createEvent = () => {

  }

  render(){
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.navBar}>
          <View style={{ flex: 1 }}/>
          <Text style={{ flex: 4 , fontSize: 28, color: "white", textAlign: 'center'}}>Events</Text>
          <TouchableOpacity style={{ flex: 1, }} onPress={this.createEvent}>
            <Text style={{ color: "white", fontSize: 36, paddingRight: 5, textAlign:'center'}}>+</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 5 }} >
          <Image source={yhack} style={style.imageStyle} />
        </View>

        <View style={styles.events}>
          {this.renderEvents()}
        </View>
        <View style={styles.botBar}>
          <TouchableOpacity style={styles.iconBox}>
            <Image source={calendar} style={}/>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconBox}>
            <Image source={map} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconBox}>
            <Image source={user} />
          </TouchableOpacity>
        </View>

      </View>
    )
  }
}

const styles = {
   navBar: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: "#597bb5",
    paddingTop: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageStyle: {
    flex: 5,
    resizeMode: "cover",
  },
  mainEvent: {
    flex: 4
  },
  events: {
    flex: 6
  },
  imageStyle: {
    flex: 1 ,
    height: undefined,
    width: undefined,
    alignSelf: "cover"
  },
  botBar: {
    flexDirection: "row",
    alignItems: 'center',
    borderColor: "#d3d3d3",
    justifyContent: 'space-between',
    borderTopWidth: 1,
    flex: 1.5
  },
  iconBox : {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
}

const mapStateToProps = state => {
  console.log('Event Screen State')
  console.log(state)
  return {

  }
}
export default connect(mapStateToProps)(EventScreen)
