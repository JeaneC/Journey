import React from 'react';
import store from './src/store/configureStore';
import { Provider } from 'react-redux';
import { StackNavigator } from 'react-navigation';

import {
  LoginScreen,
  SecondScreen,
  CreateEventScreen,
  MapScreen,
  TestScreen,
  EventScreen,
  CategorySelectionScreen
} from './src/screens/';

export default class App extends React.Component {
  render() {
    const MainNavigator = StackNavigator({
        main: {
          screen: LoginScreen,
          navigationOptions: {header : null}
        },
        map: {
          screen: MapScreen,
          navigationOptions: {header : null}
        },
        second: {
          screen: SecondScreen,
          navigationOptions: {header : null}
        },
        event: {
          screen: EventScreen,
          navigationOptions: {header : null}
        },
        createEvent: {
          screen: CreateEventScreen,
          navigationOptions: {header : null}
        },
        categorySelection: {
          screen: CategorySelectionScreen,
          navigationOptions: {header : null}
        }
      }, {
        lazy : true,
      },
    )
    return (
      <Provider store={store}>
        <MainNavigator />
      </Provider>
    );
  }
}
