import React, { Component } from 'react'
import { View, Text } from 'react-native'
import ObservationComponent from '../components/ObservationComponent'

export default class ObservationScreen extends Component {
  static navigationOptions = {
    title: 'Lisää havainto'
  }

  render() {
    
    return (
      <ObservationComponent />
    )
  }
}
