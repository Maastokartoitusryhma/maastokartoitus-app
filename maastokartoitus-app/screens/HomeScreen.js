import React, { Component } from 'react'
import Colors from '../constants/colors'  
import HomeComponent from '../components/HomeComponent'

export default class HomeScreen extends Component {
  static navigationOptions = {
    title: 'Etusivu',
    headerStyle: {
      backgroundColor: Colors.primary
    },
    headerTintColor: Colors.white,
    headerLeft: () => null
  }

  render() {
    const { navigate } = this.props.navigation

    return (
      <HomeComponent />
    )
  }
}