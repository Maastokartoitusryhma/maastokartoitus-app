import React, { Component } from 'react'
import Colors from '../constants/colors'
import LoginComponent from '../components/LoginComponent'
import { getForm } from '../controllers/Controllers'

export default class LoginScreen extends Component {
  static navigationOptions = ({ screenProps: { t } }) => ({
    title: t('mobile app'),
    headerStyle: {
      backgroundColor: Colors.headerBackground
    },
    headerTintColor: Colors.white
  })

  render() {
    getForm()
    return (
      <LoginComponent onPress = { () => this.props.navigation.replace('Home') } />
    )
  }
}