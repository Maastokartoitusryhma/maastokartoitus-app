import React, { Component } from 'react'
import Colors from '../constants/colors'
import LoginComponent from '../components/LoginComponent'
<<<<<<< HEAD
=======
import { getForm } from '../controllers/Controllers'
>>>>>>> 39312ed97d3ba861d380c35bcd11754b28d48538

export default class LoginScreen extends Component {
  static navigationOptions = ({ screenProps: { t } }) => ({
    title: t('mobile app'),
    headerStyle: {
      backgroundColor: Colors.headerBackground
    },
    headerTintColor: Colors.white
  })

  render() {
<<<<<<< HEAD
=======
    getForm()
>>>>>>> 39312ed97d3ba861d380c35bcd11754b28d48538
    return (
      <LoginComponent onPress = { () => this.props.navigation.replace('Home') } />
    )
  }
}