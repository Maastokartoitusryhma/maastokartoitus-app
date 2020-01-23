import React, { Component } from 'react'
import { View, Button, StyleSheet, TextInput, Text } from 'react-native'
import Colors from '../constants/colors'

export default class LoginScreen extends Component {
  static navigationOptions = {
    title: 'Mobiilisovellus maastokartoituksiin',
    headerStyle: {
      backgroundColor: Colors.primary
    },
    headerTintColor: Colors.white
  }

  render() {
    const { navigate } = this.props.navigation
    
    return (
      <View>
        <View style={styles.container}>
          <View style={styles.inputContainer}>
            <Text style={styles.text}>Syötä henkilökohtainen tokenisi</Text>
            <TextInput placeholder='personToken' style={styles.input} /> 
          </View>
          <View style={styles.button}>
            <Button onPress={() => navigate('Home')} title="Kirjaudu sisään" color={Colors.neutralButton}/>
          </View>
          
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: '45%'
  },
  button: {
    width: '50%',
    padding: 10,
  },
  inputContainer: {
    width: '90%',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  input: {
    borderColor: Colors.inputBorder,
    borderWidth: 1,
    height: 40,
    width: '80%', 
    padding: 10
  },
  text: {
    textAlign: 'center',
    padding: 10
  }
})

