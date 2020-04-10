import React, { useState, useEffect } from 'react'
import { View, Button, Text } from 'react-native'
import { useTranslation } from 'react-i18next'
import userController from '../controllers/userController'
import storageController from '../controllers/storageController'
import { getObservationEventSchema } from '../controllers/documentController'
import { connect, ConnectedProps } from 'react-redux'
import { replaceObservationEvents, newObservationEvent, setSchemaFi, setSchemaEn, setSchemaSv } from '../stores/observation/actions'
import { setUser, setPersonToken } from '../stores/user/actions'
import Colors from '../styles/Colors'
import Cs from '../styles/ContainerStyles'
import Bs from '../styles/ButtonStyles'
import Ts from '../styles/TextStyles'
import i18n from '../language/i18n'

type UserObject = {
  id: string
  fullName: string
  emailAddress: string
  defaultLanguage: string
}

interface RootState {
  observationEvent: any[],
  schemaFi: object
  schemaEn: object
  schemaSv: object
  user: UserObject
  token: string
}

const mapStateToProps = (state: RootState) => {
  const { observationEvent, schemaFi, schemaEn, schemaSv, user, token } = state
  return { observationEvent, schemaFi, schemaEn, schemaSv, user, token }
}

const mapDispatchToProps = {
  newObservationEvent,
  replaceObservationEvents,
  setSchemaFi,
  setSchemaEn,
  setSchemaSv,
  setUser,
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

  const { t } = useTranslation()
  const [loggingIn, setLoggingIn] = useState<boolean>(false)
  
  useEffect(() => {
    loadData()
  }, [props.user])

  // Check if user has previously logged in, redirect to home screen if is
  const loadData = async () => {
    const userData = await storageController.fetch('userData')
    const personToken = await storageController.fetch('personToken')
    if (userData !== null && personToken !== null) { // User data found from storage ==> user has logged in previously
      setLoggingIn(true)
      if (props.user === null) { // Set user data to reducer if it's not already there
        props.setUser(userData)
      }
      if (props.token === null) {
        props.setPersonToken(personToken)
      }
      i18n.changeLanguage(userData.defaultLanguage)
      await fetchObservationEvents()
      await fetchSchemasFromServer()
      props.onSuccessfulLogin()
      setLoggingIn(false)
    }
  }

  const login = async () => {
    const result = await userController.getTempTokenAndLoginUrl()
    props.onPressLogin(result)
  }

  const fetchObservationEvents = async () => {

    // Uncomment the following line to delete everything in storage:
    //await storageController.remove('observationEvents')
    // ------------------------------------------------------------

    const observationEvents: Array<Object> = await storageController.fetch('observationEvents')
    if (observationEvents  !== null) {
      props.replaceObservationEvents(observationEvents)
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


  if (loggingIn) {
    return (
      <View style={Cs.loginViewContainer}>
        <View style={Cs.loginContainer}>
          <View style={Cs.inputContainer}>
          <Text style={Ts.loginText}>{t('loading')}</Text>
          </View>
        </View>
      </View>
    )
  } else {
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

  
}

export default connector(LoginComponent)