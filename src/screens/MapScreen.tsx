import React, { Component } from 'react'
import { StyleSheet, View, Dimensions } from 'react-native'
import MapComponent from '../components/MapComponent'
import Colors from '../styles/Colors'
import { NavigationStackProp, NavigationStackScreenProps } from 'react-navigation-stack'

type Props  = {
  navigation: NavigationStackProp
}

type ScreenProps = { screenProps: any}

export default class MapScreen extends Component<NavigationStackScreenProps<Props, ScreenProps>> {
  static navigationOptions = ({ screenProps }: ScreenProps) => ({
    title: screenProps.t('map'),
    headerStyle: {
      backgroundColor: Colors.headerBackground,
    },
    headerTintColor: Colors.white,
  })

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
