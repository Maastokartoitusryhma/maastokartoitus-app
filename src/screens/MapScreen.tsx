
import React, { Component } from 'react'
import { StyleSheet, View, Dimensions } from 'react-native'
import MapComponent from '../components/MapComponent'
import Colors from '../styles/Colors'
import Cs from '../styles/ContainerStyles'
import { NavigationStackProp, NavigationStackScreenProps } from 'react-navigation-stack'

type Props  = {
  navigation: NavigationStackProp<any, any>
}

export default class MapScreen extends Component<NavigationStackScreenProps<Props>> {
  static navigationOptions = ({ screenProps }: any) => ({
    title: screenProps.t('map'),
    headerStyle: {
      backgroundColor: Colors.headerBackground,
    },
    headerTintColor: Colors.white,
  })

  render() {
    const { navigate } = this.props.navigation

    return (
      <View style = {Cs.mapContainer}>
        <MapComponent 
          onPress1 = {() => navigate('Observation')} 
        />
      </View>
    )
  }
}
