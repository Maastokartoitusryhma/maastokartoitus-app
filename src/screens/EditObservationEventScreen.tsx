import React, { Component } from 'react'
import EditObservationEventComponent from '../components/EditObservationEventComponent'
import Colors from '../styles/Colors'
import { NavigationStackProp, NavigationStackScreenProps } from 'react-navigation-stack'
import { StackRouter, NavigationActions } from 'react-navigation'

type Props  = {
  navigation: NavigationStackProp<any, any>
}

export default class EditObservationEventScreen extends Component<NavigationStackScreenProps<Props>>  {

  static navigationOptions = ({ screenProps }: any) => ({
    title: screenProps.t('edit observation event'),
    headerStyle: {
      backgroundColor: Colors.headerBackground
    },
    headerTintColor: Colors.white
  })

  render() {
    return (
      <EditObservationEventComponent onPress={() => this.props.navigation.navigate('Home')} />
    )
  }
}