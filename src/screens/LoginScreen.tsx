import React, { Component } from 'react'
import Colors from '../styles/Colors'
import LoginComponent from '../components/LoginComponent'
import { getSchema } from '../controllers/formController'
import { NavigationStackProp, NavigationStackScreenProps } from 'react-navigation-stack'

type Props  = {
  navigation: NavigationStackProp
}

type ScreenProps = { screenProps: any}

export default class LoginScreen extends Component<NavigationStackScreenProps<Props, ScreenProps>>  {
  static navigationOptions = ({ screenProps }: ScreenProps) => ({
    title: screenProps.t('mobile app'),
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