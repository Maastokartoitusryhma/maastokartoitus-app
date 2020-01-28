import React, { Component } from 'react'
import Colors from '../constants/colors'
import LoginComponent from '../components/LoginComponent'

export default class LoginScreen extends Component {
  static navigationOptions = {
    title: 'Mobiilisovellus maastokartoituksiin',
    headerStyle: {
      backgroundColor: Colors.primary
    },
    headerTintColor: Colors.white
  }

  render() {
    return (
      <LoginComponent onPress={() => this.props.navigation.replace('Home')} />
    )
  }
}