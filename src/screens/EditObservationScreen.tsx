import React, { Component } from 'react'
import EditObservationComponent from '../components/EditObservationComponent'
import Colors from '../styles/Colors'
import { NavigationStackProp, NavigationStackScreenProps } from 'react-navigation-stack'

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
    const { navigate } = this.props.navigation
    return (
      <EditObservationComponent 
        onPress={(id: string) => navigate('ObservationEvent', {id})}
        onEditLocation={() => navigate('Map')}
      />
    )
  }
}