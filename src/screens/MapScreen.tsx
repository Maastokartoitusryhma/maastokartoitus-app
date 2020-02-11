import React from 'react'
import { View } from 'react-native'
import MapComponent from '../components/MapComponent'
import Colors from '../styles/Colors'
import Cs from '../styles/ContainerStyles'

export default class MapScreen extends React.Component {
  static navigationOptions = ({ screenProps: { t } }) => ({
    title: t('map'),
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
