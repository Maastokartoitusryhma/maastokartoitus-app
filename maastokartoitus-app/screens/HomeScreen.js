import React, { Component } from 'react'
import { View, Button, StyleSheet } from 'react-native' 

export default class HomeScreen extends Component {
  static navigationOptions = {
    title: 'Mobiilisovellus maastokartoituksiin'
  }

  render() {
    const navigate = this.props.navigation
    
    return (
      <View style={styles.buttonContainer}>
        <View style={styles.button}>
          <Button
            title='Näytä kartta'
            onPress={() => navigate('Map')}      
          />
        </View>
        <View style={styles.button}>
          <Button
            title='Lisää havainto'
            onPress={() => navigate('Havainto')}
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: '40%',
    padding: 10,

  }
})

