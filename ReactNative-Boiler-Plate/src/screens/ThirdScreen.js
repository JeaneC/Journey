import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import { updateMessage, updateVal } from '../actions';
import { Button } from 'react-native-elements';

class ThirdScreen extends Component {
  constructor(props) {
    super(props)

    this.state = {
      message: '',
      val: 0
    }
  }

  componentWillReceiveProps(newProps) {
    console.log('We recieved the new props', newProps)

    let { main } = newProps['from-redux']

    this.setState({
      message: main.message,
      val : main.val
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{ flex: 4 }}/>
        <Text style={styles.text1}>Third Screen</Text>
        <Text style={styles.text2}>Message: {this.state.message} </Text>
        <Text style={styles.text2}>Stored Value: {this.state.val} </Text>
        <Button
          large
          title='Update Redux Message'
          buttonStyle={styles.button}
          backgroundColor='red'
          onPress={() => this.props.updateMessage('Hello World!')}
        />
        <Button
          large
          title='Update Redux Val'
          buttonStyle={styles.button}
          onPress={() => this.props.updateVal(10)}
          backgroundColor='green'
        />
        <Button
          large
          title='Console Log Redux Props'
          buttonStyle={styles.button}
          onPress={() => console.log(this.props)}
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
    backgroundColor: 'black'
  },
  text1 : {
    color : 'white',
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold'
  },
  text2 : {
    color : 'white',
    textAlign: 'center',
    fontSize: 14,
    fontWeight: 'bold'
  },
  button : {
    marginBottom: 10
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    'from-redux' : state
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    updateMessage: (message) => { dispatch(updateMessage(message)) },
    updateVal: (val) => { dispatch(updateVal(val)) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ThirdScreen);
