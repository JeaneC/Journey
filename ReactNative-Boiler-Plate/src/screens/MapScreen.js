import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { MapView, Location, Constants, Permissions } from 'expo';
import { Button, Icon } from 'react-native-elements';
import axios from 'axios';
import qs from 'qs';
import polyline from 'google-polyline'

import CircleMenu from '../components/react-native-circle';

let id = 1;
let loaded = false;


class lineScreen extends Component {
  items = [
    {
      name: 'md-home',
      color: '#298CFF'
    },
    {
      name: 'md-search',
      color: '#30A400'
    },
    {
      name: 'md-time',
      color: '#FF4B32'
    },
    {
      name: 'md-settings',
      color: '#8A39FF'
    },
    {
      name: 'md-navigate',
      color: '#FF6A00'
    }
  ];

  static navigationOptions = {
    title: 'Line',
    tabBarIcon: ({ tintColor }) => {
      return <Icon name='navigation' size={30} />
    },
    // Note: By default the icon is only shown on iOS. Search the showIcon option below.

  };

  constructor() {
    super();

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
      polylines: [
         {
          coordinates: [
          ],
          id: 0,
        },
      ],

    };

    this.onMapPress = this.onMapPress.bind(this);

  }
  onMapPress(e) {
    // Commment to prevent marker creating
    this.setState({
      markers: [
        ...this.state.markers,
        {
          coordinate: e.nativeEvent.coordinate,
          id: `${id++}`,
        },
      ],
    });
  }

  printPath = () => {
    console.log('The Path Is');
    console.log(this.state.polylines);
  }

  prev = () => {
    if (this.state.markers.length == 0) {
      return ''
    }
    let markers = [...this.state.markers]
    markers.pop()

    let polylines = [
       {
        coordinates: [
        ],
        id: 0,
      },
    ]

    this.setState({
      markers,
      polylines
    });
  }

  drawPath = async () => {

    console.log('Decoding Mode')


    if (this.state.markers.length < 2 ) {
      return console.log('We Need More Markers')
    }

    let { markers } = this.state
    //console.log('We have enough markers')
    //console.log(markers)


    const origin = `${markers[0].coordinate.latitude},${markers[0].coordinate.longitude}`
    const destination = `${markers[1].coordinate.latitude},${markers[1].coordinate.longitude}`


    const GD_ROOT_URL = 'https://maps.googleapis.com/maps/api/directions/json?'
    const GD_QUERY_PARAMS = {
      key: 'AIzaSyCIrbtT3T0epacU3xxA_P1cq9Nqi9iOAzc',
      origin,
      destination
    };

    const params = qs.stringify(GD_QUERY_PARAMS)
    const query = `${GD_ROOT_URL}${params}`
    console.log(query)

    let { data } = await axios.get(query); //google api request
    // let coordList = data.routes[0].legs;

    //let steps = data.routes[0].legs[0].steps
    let overview = data.routes[0].overview_polyline.points

    let coordsList = polyline.decode(overview)

    let coordinates = []
    for (i=0; i < coordsList.length; i++) {
        coordinates.push({
          latitude: coordsList[i][0],
          longitude: coordsList[i][1]
        })
    }

    let polylines = [
       {
        coordinates,
        id: 0,
      },
    ]

    this.setState({polylines})

  }

  clearMarkers = () => {
    let markers = [

    ]

    let polylines = [
       {
        coordinates: [
        ],
        id: 0,
      },
    ]

    this.setState({
      markers,
      polylines
    });

  }

  onRegionChangeComplete = (region) => {
  this.setState({ region });
}

  render() {
    return (
      <View>
        <CircleMenu
              bgColor="#E74C3C"
              items={this.items}
              onPress={this.onPress}
          />
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
  buttonContainer: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'center',
    bottom: 20,
    left: 0,
    right: 0
  },
  buttonStyle: {
    flex: 1,
    width: 70,
    borderRadius: 10
  }
}

export default lineScreen;
