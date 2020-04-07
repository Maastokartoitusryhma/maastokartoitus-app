import React, { Component } from 'react'
import Colors from '../styles/Colors'
import LoginComponent from '../components/LoginComponent'
import { getSingleObservationSchema } from '../controllers/documentController'
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
    //getSingleObservationSchema()
    return (
      <LoginComponent
        onPressLogin={(loginURL: string) => {
          this.props.navigation.navigate('WebView', { loginURL }) // Redirect to login web view
        }}
        onSuccessfulLogin={() => {
          this.props.navigation.replace('Home')
        }}
      />
        
    )
  }
}