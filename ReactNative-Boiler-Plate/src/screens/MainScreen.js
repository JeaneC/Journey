import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Button } from 'react-native-elements';

class MainScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={{ flex: 4 }}/>
        <Text style={styles.text1}>Main Screen</Text>
        <Button
          large
          title='Next Screen'
          onPress={() => this.props.navigation.navigate('second')}
          backgroundColor='blue'
        />
        <View style={{ flex: 4}} />
      </View>
    )
  }
}

const styles = {
  container : {
    flex : 1,
    backgroundColor: 'red',
  },
  text1 : {
    flex: 1,
    color : 'white',
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold'
  }
}

export default MainScreen;
