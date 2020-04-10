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

  timer = 0

  componentWillUnmount() {
    console.log('unmount')
    console.log('clear interval', this.timer)
    // Wait for 3 seconds so that login can be finished
    setTimeout(() => {
      clearInterval(this.timer)
    }, 3000)
    
  }

  render() {
    const { navigate } = this.props.navigation

    const callback = (data: number) => {
      this.timer = data
    }

    return (
      <WebViewComponent
        result={this.props.navigation.state.params.result}
        onTimeout = {() => navigate('Login')}
        callback={callback}
      />
    )
  }
}