import React from 'react'
import { StyleSheet, View, Dimensions } from 'react-native'
import MapComponent from '../components/MapComponent'
import Colors from '../constants/colors'

export default class MapScreen extends React.Component {
  static navigationOptions = {
    title: 'Kartta',
    headerStyle: {
      backgroundColor: Colors.headerBackground,
    },
    headerTintColor: Colors.white,
  }

  render() {
    const { navigate } = this.props.navigation

    return (
      <View style = { styles.container }>
        <MapComponent mapStyle = { styles.mapStyle } onPress1 = { () => navigate('Observation') } />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapStyle: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  }
})
