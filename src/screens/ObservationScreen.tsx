import React, { Component } from 'react'
import ObservationComponent from '../components/ObservationComponent'
import Colors from '../styles/Colors'
import { NavigationStackProp, NavigationStackScreenProps } from 'react-navigation-stack'

type Props  = {
  navigation: NavigationStackProp
}

type ScreenProps = { screenProps: any}

export default class ObservationScreen extends Component<NavigationStackScreenProps<Props, ScreenProps>>  {

  static navigationOptions = ({ screenProps }: ScreenProps) => ({
    title: screenProps.t('add observation'),
    headerStyle: {
      backgroundColor: Colors.headerBackground
    },
    headerTintColor: Colors.white
  })

  render() {
    return (
      <ObservationComponent />
    )
  }
}
