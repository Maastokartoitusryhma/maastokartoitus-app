import React, { Component } from 'react'
import Colors from '../styles/Colors'
import LoginComponent from '../components/LoginComponent'
import { getSchema } from '../controllers/formController'

export default class LoginScreen extends Component {
  static navigationOptions = ({ screenProps: { t } }) => ({
    title: t('mobile app'),
    headerStyle: {
      backgroundColor: Colors.headerBackground
    },
    headerTintColor: Colors.white
  })

  render() {
    getSchema()
    return (
      <LoginComponent onPress = { () => this.props.navigation.replace('Home') } />
    )
  }
}