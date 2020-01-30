import React, { Component } from 'react'
import Colors from '../constants/colors'  
import HomeComponent from '../components/HomeComponent'

export default class HomeScreen extends Component {
  static navigationOptions = {
    title: 'Etusivu',
    headerStyle: {
      backgroundColor: Colors.headerBackground,
    },
    headerTintColor: Colors.white,
    headerLeft: () => null
  }

  render() {

    return (
      <HomeComponent
        onPressMap={() => this.props.navigation.navigate('Map')}
        onLogout={() => this.props.navigation.replace('Login')}
       />
    )
  }
}