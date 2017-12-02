import React, { Component } from 'react';
import { View, Text, Animated, Modal } from 'react-native';
import { MapView, Location, Constants, Permissions } from 'expo';
import { Icon, Button } from 'react-native-elements';
import {
  getEventInfo,
  database,
  updatePlayerTurn,
  setMarkers,
  updateCurrentTurn,
  setPolylines
} from '../firebase/firebase';
import qs from 'qs';
import axios from 'axios';
import polyline from 'google-polyline'


const EVENT_ID = "event0001";
const USER_ID = "1637485562938133"
const MAX_TURNS = 7 //Subtract one since we start from 0

let id = 1;

const colorDict = {
  "0" : "#e74c3c",
  "1" : "#3498db",
  "2" : "#2ecc71",
  "3" : "#f1c40f"
}

const playerDict = {
  "1637485562938133" : "0",
  "1588411377848181" : "1",
  "1588411377848181" : "2",
  "1588411377848182" : "3"
}

// Red, Blue, Green, Yellow

class MapScreen extends Component {
  static navigationOptions = {
    title: 'Marker',
    tabBarIcon: ({ tintColor }) => {
      return <Icon name='map' size={30} />
    },
    // Note: By default the icon is only shown on iOS. Search the showIcon option below.

  };

  constructor(props) {
    super(props);

    this.state = {
      mapLoaded: false,
      nextStop: 1,
      region: {
        latitude: 40.72004412623778,
        longitude: -73.8111714306203,
        longitudeDelta: 0.015,
        latitudeDelta: 0.015,
      },
      markers: [

      ],
      modalVisible: false,
      polylines : [
         {
          coordinates: [
          ],
          id: 0,
        },
      ],
      event: null,
      turnCount: null,
      currentPlayer: null

    };

    this.onMapPress = this.onMapPress.bind(this);

  }

  createPolyline = async (oldMarker, newMarker) => {
    if (this.state.turnCount < 1) {
      return
    }

    let { markers } = this.state
    let markersLength = markers.length
    //console.log('We have enough markers')
    //console.log(markers)


    const origin = `${oldMarker.coordinate.latitude},${oldMarker.coordinate.longitude}`
    const destination = `${newMarker.coordinate.latitude},${newMarker.coordinate.longitude}`


    const GD_ROOT_URL = 'https://maps.googleapis.com/maps/api/directions/json?'
    const GD_QUERY_PARAMS = {
      key: 'AIzaSyCIrbtT3T0epacU3xxA_P1cq9Nqi9iOAzc',
      origin,
      destination
    };

    const params = qs.stringify(GD_QUERY_PARAMS)
    const query = `${GD_ROOT_URL}${params}`

    let { data } = await axios.get(query); //google api request

    let overview = data.routes[0].overview_polyline.points

    let coordsList = polyline.decode(overview)

    let coordinates = []
    for (i=0; i < coordsList.length; i++) {
        coordinates.push({
          latitude: coordsList[i][0],
          longitude: coordsList[i][1]
        })
    }

    let polylineLength = this.state.polylines.length;

    let polylines = [
      ...this.state.polylines,
       {
        coordinates,
        id: polylineLength,
      },
    ]

    setPolylines(EVENT_ID, polylines)
    console.log('Pre Polylines')
    console.log(polylines)

    this.setState({ polylines })

  }

  onMapPress(e) {
    // Commment to prevent marker creating
    this.makeMove(e.nativeEvent.coordinate)
  }

  clearMarkers = () => {
    let markers = []
    this.setState({ markers })
  }

  prev = () => {
    if (this.state.markers.length == 0) {
      return ''
    }
    let markers = [...this.state.markers]
    markers.pop()

    this.setState({ markers });
  }


  onRegionChangeComplete = (region) => {
    this.setState({ region });
  }

  componentDidMount() {
    console.log('pre event')
    //This function will update whenever there is a change in a specific value
    database.ref(`events/${EVENT_ID}/currentPlayer`).on("value", (snapshot) => {
      const currentPlayer = snapshot.val()
      if (currentPlayer != null || currentPlayer != undefined ) {
        this.setState({ currentPlayer })
      }
    })

    //We should change this to just add the new child node, but for now
    //we will inefficiently wewrite the list
    database.ref(`events/${EVENT_ID}/markers`).on("value", (snapshot) => {
      const markers = snapshot.val()
      // console.log(markers)
      if ( markers ) {
        this.setState({ markers })
      }
    })

    database.ref(`events/${EVENT_ID}/polylines`).on("value", (snapshot) => {
      const polylines = snapshot.val()
      // console.log(markers)
      if ( polylines ) {
        this.setState({ polylines })
      }
    })


    getEventInfo(EVENT_ID)
      .then(event => this.setState({ event }))

    //App is done if currentMove = numberOfTurns
    database.ref(`events/${EVENT_ID}/currentTurn`).on("value", (snapshot) => { //Since we start counting turns at 0
      const turnCount = snapshot.val()
      if ( turnCount >= MAX_TURNS ) {
        console.log('App Ended')
      } else {
        this.setState({ turnCount })
      }
    })

  }

  renderMarkerColor = (number) => {
    const trueNumber = number % 4;

    return colorDict[trueNumber]
  }

  renderPolylineColor = (number) => {
    const trueNumber = (number) % 4;

    return colorDict[trueNumber]
  }

  //When user presses anywhere on the map
  makeMove = (coordinate) => {
    //If user is the targeted current player
    if (this.state.currentPlayer == playerDict[USER_ID]) {
      const lastId = this.state.markers.length;

      const newMarker = {
        coordinate,
        id: `${lastId}`
      }

      const oldMarker = {
        ...this.state.markers[this.state.markers.length-1]
      }

      const newMarkers = [
        ...this.state.markers,
        {
          ...newMarker
        }
      ]
      this.setState({ markers: newMarkers });

      newId = parseInt(playerDict[USER_ID]) + 1 ;
      if ( newId > 3 ) {
        newId = 0
      }

      updateCurrentTurn(EVENT_ID, parseInt(this.state.turnCount) + 1);
      updatePlayerTurn(EVENT_ID, newId)
      setMarkers(EVENT_ID, newMarkers)
      this.createPolyline(oldMarker, newMarker)

      //Increment player value on firebase
    } else {
      // console.log(playerDict[USER_ID])
      // console.log(this.state.currentPlayer)
      // console.log("It's not this player's move")
    }
  }

  setModalVisible = (visible) => this.setState({modalVisible: visible})


  render() {
    return (
      <View style={styles.container}>

        <MapView
          style={styles.mapStyle}
          region={this.state.region}
          onPress={this.onMapPress}
          zoomEnabled={true}
          pitchEnabled={false}
          onRegionChangeComplete={this.onRegionChangeComplete}
        >
        {this.state.markers.map((marker, index) => {
          return (
            <MapView.Marker
              coordinate={marker.coordinate}
              key={index}
            >
              <Animated.View style={styles.markerWrap}>
                <View style = {[styles.marker,
                      { backgroundColor: this.renderMarkerColor(index)}
                    ]}
                />
              </Animated.View>
            </MapView.Marker>
          );
        })}
        {this.state.polylines.map((polyline, index) => {
          const strokeColor = this.renderPolylineColor(index)
          return(
            <MapView.Polyline
              key={polyline.id}
              coordinates={polyline.coordinates}
              strokeColor={strokeColor}
              fillColor="rgba(255,0,0)"
              strokeWidth={7}
            />
          )
        })}
        </MapView>
        <View style={styles.buttonContainer2}>
          <Button
            large
            title="List All Coords"
            backgroundColor="#009688"
            icon={{ name: 'map' }}
            onPress={() => this.printMarkers()}
            buttonStyle={{ borderRadius: 10 }}
          />
        </View>
      </View>
    )
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: 'blue'
  },
  mapStyle: {
    flex: 1
  },
  buttonContainer1: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'center',
    bottom: 100,
    left: 0,
    right: 0
  },
  buttonContainer2: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0
  },
  buttonStyle: {
    flex: 1,
    width: 160,
    borderRadius: 10
  },
  viewContainer: {
    flex: 1,
    bottom: 0,
    backgroundColor: "#fc9d05",
    alignItems: 'center',
    justifyContent: 'center'
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15
  },
  marker: {
    width: 18,
    height: 18,
    borderRadius: 22,
    backgroundColor: "rgba(255,0,0, 0.9)",
  },
  markerWrap: {
    alignItems: "center",
    justifyContent: "center",
  },
}



export default MapScreen;
