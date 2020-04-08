import React, { useState, useEffect } from 'react'
import { View, Button, Text, AsyncStorage } from 'react-native'
import Colors from '../styles/Colors'
import userController from '../controllers/userController'
import { useTranslation } from 'react-i18next'
import i18n from '../language/i18n'
import Cs from '../styles/ContainerStyles'
import Bs from '../styles/ButtonStyles'
import Ts from '../styles/TextStyles'
import storageController from '../controllers/storageController'
import { getObservationEventSchema } from '../controllers/documentController'
import { connect, ConnectedProps } from 'react-redux'
import { newObservationEvent, setSchemaFi, setSchemaEn, setSchemaSv } from '../stores/observation/actions'
import { setPersonToken } from '../stores/user/actions'

interface RootState {
  observationEvent: any[],
  schemaFi: object
  schemaEn: object
  schemaSv: object
}

const mapStateToProps = (state: RootState) => {
  const { observationEvent, schemaFi, schemaEn, schemaSv } = state
  return { observationEvent, schemaFi, schemaEn, schemaSv }
}

const mapDispatchToProps = {
  newObservationEvent,
  setSchemaFi,
  setSchemaEn,
  setSchemaSv,
  setPersonToken
}

const connector = connect(
  mapStateToProps,
  mapDispatchToProps,
)

type PropsFromRedux = ConnectedProps<typeof connector>

type Props = PropsFromRedux & {
  onPressLogin: (url: string) => void
  onSuccessfulLogin: () => void
}

const LoginComponent = (props: Props) => {

  const [polling, setPolling] = useState(false)
  const [loginURL, setLoginURL] = useState('')
  const { t } = useTranslation()
  
  useEffect(() => {
    loadUserData()
  }, [])

  // Check if user has previously logged in, redirect to home screen if is
  const loadUserData = async () => {
    const userData = await AsyncStorage.getItem('userData')
    const personToken = await AsyncStorage.getItem('personToken')
    console.log('USER:', userData)
    console.log('PERSONTOKEN:', personToken)
    if (personToken !== null) {
      props.setPersonToken(personToken)
    }
    if (userData !== null) {
      i18n.changeLanguage(JSON.parse(userData).defaultLanguage)
      await fetchObservationEvents()
      await fetchSchemasFromServer()
      props.onSuccessfulLogin()
    }
  }

  const login = async () => {
    if (!polling) { // User has not yet opened web login view
      const result = await userController.getTempTokenAndLoginUrl()
      setLoginURL(result.loginURL)
      props.onPressLogin(result.loginURL)
      setPolling(true)
      pollPostRequest(result.tmpToken, 3000) // Start polling login request
    } else { // User has already opened web login view --> redirect there
      props.onPressLogin(loginURL)
    }
  }

  const pollPostRequest = async (tmpToken: string, interval: number) => {
    const run = async () => {
      const result = await userController.postTmpToken(tmpToken)
      if (result.token !== undefined) { // Login is successful and personToken is returned in result
        getUserInfo(result.token)
        console.log('Saving token to redux: ', result.token)
        props.setPersonToken(result.token)
      } else {
        setTimeout(() => {
          run()
        }, interval) 
      }
    }
    run()
  }

  // Get user info based on personToken
  const getUserInfo = async (token: string) => {
    const userObject = await userController.getUserByPersonToken(token)
    if (userObject.error === undefined) {
      await storeUserData(JSON.stringify(userObject), token)
      loadUserData()
    } else {
      console.log('SOME ERROR')
    }
  }

  // Save user data to storage
  const storeUserData = async (userObject: string, personToken: string) => {
    try {
      await AsyncStorage.setItem('userData', userObject)
      await AsyncStorage.setItem('personToken', personToken)
    } catch (e) {
      console.log('Error saving user data to storage: ', e)
    }
  }

  const fetchObservationEvents = async () => {

    // Uncomment the following line to delete everything in storage:
    //await storageController.remove('observationEvents')
    // ------------------------------------------------------------

    const observationEvents: Array<Object> = await storageController.fetch('observationEvents')
    if (observationEvents !== null) {
      observationEvents.forEach((event) => {
        props.newObservationEvent(event)
      })
    }
  }

  const fetchSchemasFromServer = async () => {
    const schemaInFi: object = await getObservationEventSchema('fi')
    const schemaInEn: object = await getObservationEventSchema('en')
    const schemaInSv: object = await getObservationEventSchema('sv')
    props.setSchemaFi(schemaInFi)
    props.setSchemaEn(schemaInEn)
    props.setSchemaSv(schemaInSv)
  }

  return (
    <View style={Cs.loginViewContainer}>
      <View style={Cs.loginContainer}>
        <Text style={Ts.loginHeader}>{t('login')}</Text>
        <View style={Cs.inputContainer}>
          <Text style={Ts.loginText}>{t('login text')}</Text>
        </View>
        <View style={Bs.loginButton}>
          <Button onPress={login} title={t('login')} color={Colors.neutralColor} />
        </View>
      </View>
      <View style={Cs.loginLanguageContainer}>
        <Text style={Ts.loginLanguage} onPress={() => i18n.changeLanguage('fi')}>FI</Text>
        <Text style={Ts.loginLanguage} onPress={() => i18n.changeLanguage('sv')}>SV</Text>
        <Text style={Ts.loginLanguage} onPress={() => i18n.changeLanguage('en')}>EN</Text>
      </View>
    </View>
  )
}

export default connector(LoginComponent)