import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import { database, setMessage, getSecretMessages } from '../firebase/firebase';

class SecondScreen extends Component {

  getFirebaseStuff = async () => {
    let firebasePromise = await getSecretMessages()
    console.log(firebasePromise)
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{ flex: 4 }}/>
        <Text style={styles.text1}>Second Screen</Text>
        <Button
          large
          title='Firebase Set'
          buttonStyle={styles.button}
          backgroundColor='red'
          onPress={() => setMessage('Hello World')}
        />
        <Button
          large
          title='Firebase Get'
          buttonStyle={styles.button}
          onPress={() => this.getFirebaseStuff()}
          backgroundColor='green'
        />
        <Button
          large
          title='Next Screen'
          buttonStyle={styles.button}
          onPress={() => this.props.navigation.navigate('third')}
          backgroundColor='black'
        />
        <View style={{ flex: 4}} />
      </View>
    )
  }
}

const styles = {
  container : {
    flex : 1,
    backgroundColor: 'blue'
  },
  text1 : {
    color : 'white',
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold'
  },
  button : {
    marginBottom: 10
  }
}

export default SecondScreen;
