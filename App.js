import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {
  createStackNavigator,  createAppContainer,  createBottomTabNavigator, createSwitchNavigator,
} from 'react-navigation';

import Screen3 from './app/components/screen3/Screen3.js';


const StackNavigator = createStackNavigator({
    Screen3: {
        screen: Screen3,
        navigationOptions: {
            title: false,
            header: null,
        }
    },
},{ headerMode: 'screen' });

const App = createAppContainer(StackNavigator);

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
