import React, { useState, useEffect } from 'react'
import { View, Button, Text, TextInput, AsyncStorage } from 'react-native'
import Colors from '../constants/colors'
import userService from '../services/UserService'
import { useTranslation } from 'react-i18next'
import Cs from '../styles/ContainerStyles'
import Bs from '../styles/ButtonStyles'
import Ts from '../styles/TextStyles'
import Os from '../styles/OtherStyles'

const LoginComponent = (props) => {

  const [personToken, setPersonToken] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const { t } = useTranslation()

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
      setErrorMessage(t('incorrect token'))
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
      <View style={Cs.loginContainer}>
        <Text style={Ts.loginHeader}>{t('login')}</Text>
        <View style={Cs.inputContainer}>
          <Text style={Ts.loginText}>{t('personal token')}</Text>
          <TextInput
            placeholder='personToken'
            style={Os.textInput}
            value={personToken}
            onChangeText={inputHandler}
          />
        </View>
        <View style={Bs.loginButton}>
          <Button onPress={login} title={t('login')} color={Colors.neutralColor} />
        </View>
        <Text style={Ts.errorText}>{errorMessage}</Text>
      </View>
    </View>
  )
}

export default LoginComponent