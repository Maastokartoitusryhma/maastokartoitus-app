import React, { Component } from 'react'
import Colors from '../styles/Colors'
import WebViewComponent from '../components/WebViewComponent'
import { NavigationStackProp, NavigationStackScreenProps } from 'react-navigation-stack'

type Props  = {
  navigation: NavigationStackProp<any, any>
}

export default class WebViewScreen extends Component<NavigationStackScreenProps<Props>>  {
  static navigationOptions = ({ screenProps }: any) => ({
    title: screenProps.t('login'),
    headerStyle: {
      backgroundColor: Colors.headerBackground
    },
    headerTintColor: Colors.white
  })

  

  render() {
    return (
      <WebViewComponent
        loginURL={this.props.navigation.state.params.loginURL}
      />
    )
  }
}