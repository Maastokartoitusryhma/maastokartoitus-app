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
    const { navigate } = this.props.navigation
    
    return (
      <LoginComponent onPress={() => navigate('Home')} />
    )
  }
}