import React, { Component } from 'react'
import ObservationComponent from '../components/ObservationComponent'
import Colors from '../styles/Colors'
import { NavigationStackProp, NavigationStackScreenProps } from 'react-navigation-stack'

type Props  = {
  navigation: NavigationStackProp<any, any>
}

export default class ObservationScreen extends Component<NavigationStackScreenProps<Props>>  {

  static navigationOptions = ({ screenProps }: any) => ({
    title: screenProps.t('add observation'),
    headerStyle: {
      backgroundColor: Colors.headerBackground
    },
    headerTintColor: Colors.white
  })

  render() {
    return (
      <ObservationComponent 
        onPress={() => this.props.navigation.navigate('Map')} 
        type={this.props.navigation.state.params.type}
      />
    )
  }
}
