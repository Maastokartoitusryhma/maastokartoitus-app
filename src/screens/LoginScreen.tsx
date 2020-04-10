import React, { Component } from 'react'
import Colors from '../styles/Colors'
import LoginComponent from '../components/LoginComponent'
import { NavigationStackProp, NavigationStackScreenProps } from 'react-navigation-stack'

type Props  = {
  navigation: NavigationStackProp<any, any>
}

export default class LoginScreen extends Component<NavigationStackScreenProps<Props>>  {
  static navigationOptions = ({ screenProps }: any) => ({
    title: screenProps.t('mobile app'),
    headerStyle: {
      backgroundColor: Colors.headerBackground
    },
    headerTintColor: Colors.white,
  })

  render() {
    return (
      <LoginComponent
        onPressLogin={(result: any) => {
          this.props.navigation.navigate('WebView', { result }) // Redirect to login web view
        }}
        onSuccessfulLogin={() => {
          this.props.navigation.replace('Home')
        }}
      />
        
    )
  }
}