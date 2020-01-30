import React, { useState, useEffect } from 'react'
import { View, Button, Text, TextInput, StyleSheet, AsyncStorage } from 'react-native'
import Colors from '../constants/colors'
import userService from '../services/UserService'

const LoginComponent = (props) => {

  useEffect(() => {
    const loggedInUserName = AsyncStorage.getItem('LoggedInFullName')
    if (loggedInUserName !== null) {
      props.onPress()
    }
  }, [])

  const [personToken, setPersonToken] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const login = async () => {
    await userService.getUserByPersonToken(personToken).then(userObject => {
      if (userObject.error === undefined) { // if user is not found, a json object with error is returned, hence check if it exists
        storeLoggedInUser(userObject)
        setErrorMessage('')
        props.onPress()
      } else {
        setErrorMessage('Virheellinen token')
      }
    })
  }

  const storeLoggedInUser = async (userObject) => {
    try {
      await AsyncStorage.setItem('LoggedInID', userObject.id)
      await AsyncStorage.setItem('LoggedInFullName', userObject.fullName)
      await AsyncStorage.setItem('LoggedInEmail', userObject.emailAddress)
      await AsyncStorage.setItem('LoggedInDefLang', userObject.defaultLanguage)
      await AsyncStorage.setItem('LoggedInPersonToken', personToken)
    } catch(e) {
      console.log('Error saving to storage: ', e)
    }
  }

  const inputHandler = personToken => {
    setPersonToken(personToken)
  }

  return (
    <View>
      <View style = { styles.container }>
        <View style = { styles.inputContainer }>
          <Text style = { styles.text }>Syötä henkilökohtainen tokenisi</Text>
          <TextInput
            placeholder = 'personToken'
            style = { styles.input }
            value = { personToken }
            onChangeText = { inputHandler }
          />
        </View>
        <View style = { styles.button }>
          <Button onPress = { login } title = "Kirjaudu sisään" color = { Colors.neutralButton }/>
        </View>
        <Text style = { styles.errorMessage }>{ errorMessage }</Text>
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