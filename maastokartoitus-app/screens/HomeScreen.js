import React, { Component } from 'react'
import { Button, StyleSheet, View } from 'react-native'
import Colors from '../constants/colors'  
import HomeComponent from '../components/HomeComponent'

export default class HomeScreen extends Component {
  static navigationOptions = {
    title: 'Etusivu',
    headerStyle: {
      backgroundColor: Colors.primary
    },
    headerTintColor: Colors.white,
    headerLeft: () => null,
    headerRight: () => (
      <View style = { styles.logoutButtonContainer }>
        <Button
          style = { styles.logoutButton }
          color = { Colors.negativeButton }
          title = "Kirjaudu ulos"
          />
      </View>
      
    )
  }

  render() {
    const { navigate } = this.props.navigation

    return (
      <HomeComponent
        onPressMap = { () => navigate('Map') }
       />
    )
  }
}

const styles = StyleSheet.create({
  logoutButtonContainer: {
    padding: 10
  },
  logoutButton: {
    width: '80%'
  }
})