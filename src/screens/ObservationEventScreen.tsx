import React, { Component } from 'react'
import { View } from 'react-native'
import Colors from '../styles/Colors'
import ObservationEventComponent from '../components/ObservationEventComponent'
import { NavigationStackProp, NavigationStackScreenProps } from 'react-navigation-stack'

type Props  = {
  navigation: NavigationStackProp<any, any>
}

export default class ObservationEventScreen extends Component<NavigationStackScreenProps<Props>> {

  static navigationOptions = ({ screenProps }: any) =>  ({
    title: screenProps.t('event'),
    headerStyle: {
      backgroundColor: Colors.headerBackground,
    },
    headerTintColor: Colors.white
  })

  render() {
    return (
      <ObservationEventComponent
        id={this.props.navigation.state.params.id}
        onPressObservation={() => {this.props.navigation.navigate('EditObservation')}}
      />
    )
  }
}