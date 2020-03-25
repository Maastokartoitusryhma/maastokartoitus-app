import React, { Component } from 'react'
import EditObservationComponent from '../components/EditObservationComponent'
import Colors from '../styles/Colors'
import { NavigationStackProp, NavigationStackScreenProps } from 'react-navigation-stack'
import { StackRouter, NavigationActions } from 'react-navigation'

type Props  = {
  navigation: NavigationStackProp<any, any>
}

export default class EditObservationScreen extends Component<NavigationStackScreenProps<Props>>  {

  static navigationOptions = ({ screenProps }: any) => ({
    title: screenProps.t('edit observation'),
    headerStyle: {
      backgroundColor: Colors.headerBackground
    },
    headerTintColor: Colors.white
  })

  render() {
    return (
      <EditObservationComponent 
        onPress={() => this.props.navigation.navigate('Home')}
        eventID={this.props.navigation.state.params.eventID}
        observationID={this.props.navigation.state.params.observationID}
        type={this.props.navigation.state.params.type}
      />
    )
  }
}