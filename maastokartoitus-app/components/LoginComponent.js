import React, { useState, useEffect } from 'react'
import { View, Button, Text, TextInput, StyleSheet, AsyncStorage } from 'react-native'
import Colors from '../constants/colors'
import userService from '../services/UserService'

const LoginComponent = (props) => {

  const [personToken, setPersonToken] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  // Check if user has previously logged in, redirect to home screen if is

  useEffect(() => {
    const loadUserData = async () => {
      const userData = await AsyncStorage.getItem('userData')
      if (userData !== null) {
        props.onPress()
      }
    }
    loadUserData()
  }, [])

  const login = async () => {
    const userObject = await userService.getUserByPersonToken(personToken)
    // If user is not found, a JSON object with key 'error' is returned, hence check if it exists
    if (userObject.error === undefined) {
      storeUserData(JSON.stringify(userObject))
      setErrorMessage('')
      props.onPress()
    } else {
      setErrorMessage('Virheellinen token')
    }
  }

  // Save user data to storage
  const storeUserData = async (userObject) => {
    try {
      await AsyncStorage.setItem('userData', userObject)
    } catch (e) {
      console.log('Error saving user data to storage: ', e)
    }
  }

  const inputHandler = personToken => {
    setPersonToken(personToken)
  }

  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.header}>Kirjaudu sisään</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.text}>Syötä henkilökohtainen tokenisi</Text>
          <TextInput
            placeholder='personToken'
            style={styles.input}
            value={personToken}
            onChangeText={inputHandler}
          />
        </View>
        <View style={styles.button}>
          <Button onPress={login} title="Kirjaudu sisään" color={Colors.neutralColor} />
        </View>
        <Text style={styles.errorMessage}>{errorMessage}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: '45%'
  },
  header: {
    fontSize: 25,
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
  },
  errorMessage: {
    color: Colors.negativeColor
  }
})

export default LoginComponent