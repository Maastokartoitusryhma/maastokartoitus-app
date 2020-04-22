import React, { useState, useEffect } from 'react'
import { View, Button, Text } from 'react-native'
import { useTranslation } from 'react-i18next'
import userController from '../controllers/userController'
import storageController from '../controllers/storageController'
import { getObservationEventSchema } from '../controllers/documentController'
import zoneController from '../controllers/zoneController'
import { connect, ConnectedProps } from 'react-redux'
import { setObservationZones } from '../stores/map/actions'
import { replaceObservationEvents, newObservationEvent, setSchemaFi, setSchemaEn, setSchemaSv } from '../stores/observation/actions'
import { setUser, setPersonToken } from '../stores/user/actions'
import { setMessageVisibilityTrue, updateMessageContent } from '../stores/other/actions'
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
  setPersonToken,
  setMessageVisibilityTrue,
  updateMessageContent,
  setObservationZones
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
    //console.log(personToken)
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
      await fecthObservationZones()
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
    // await storageController.remove('observationEvents')
    // ------------------------------------------------------------

    const observationEvents: Array<Object> = await storageController.fetch('observationEvents')
    if (observationEvents !== null) {
      props.replaceObservationEvents(observationEvents)
    }
  }

  const fetchSchemasFromServer = async () => {
    // Try to fetch Finnish schema from server
    let schemaInFi: object = await getObservationEventSchema('fi')    
    if (schemaInFi === null) {
      // Couldn't load schema from server. Check for local copy.
      setMessageVisibilityTrue()
      schemaInFi = await storageController.fetch('schemaFi')
      if (schemaInFi === null) {
        // No local copy available. 
        updateMessageContent('Suomenkielisen havaintopohjan lataaminen palvelimelta epäonnistui. Vaihda kieltä.')
      } else {
        updateMessageContent('Suomenkielisen havaintopohjan lataaminen palvelimelta epäonnistui. Käytetään tallennettua pohjaa.')
      }
    } else {
      await storageController.save('schemaFi', schemaInFi)
    }
    props.setSchemaFi(schemaInFi)

    // Try to fetch English schema from server
    let schemaInEn: object = await getObservationEventSchema('en')
    if (schemaInEn === null) {
      // Couldn't load schema from server. Check for local copy.
      setMessageVisibilityTrue()
      schemaInEn = await storageController.fetch('schemaEn')
      if (schemaInEn === null) {
        // No local copy available.
        updateMessageContent('Englanninkielisen havaintopohjan lataaminen palvelimelta epäonnistui. Vaihda kieltä.')
      } else {
        updateMessageContent('Englanninkielisen havaintopohjan lataaminen palvelimelta epäonnistui. Käytetään tallennettua pohjaa.')
      }
    } else {
      await storageController.save('schemaEn', schemaInEn)
    }
    props.setSchemaEn(schemaInEn)

    // Try to fetch Swedish schema from server
    let schemaInSv: object = await getObservationEventSchema('sv')
    if (schemaInSv === null) {
      // Couldn't load schema from server. Check for local copy.
      setMessageVisibilityTrue()
      schemaInSv = await storageController.fetch('schemaSv')
      if (schemaInSv === null) {
        // No local copy available.
        updateMessageContent('Ruotsinkielisen havaintopohjan lataaminen palvelimelta epäonnistui. Vaihda kieltä.')
      } else {
        updateMessageContent('Ruotsinkielisen havaintopohjan lataaminen palvelimelta epäonnistui. Käytetään tallennettua pohjaa.')
      }
    } else {
      await storageController.save('schemaSv', schemaInSv)
    }
    props.setSchemaSv(schemaInSv)
  }

  const fecthObservationZones = async () => {
    // Try to fetch observation zones from server
    let zones = await zoneController.getZones()
    if (zones === null) {
      // Couldn't load zones from server. Check for local copy.
      setMessageVisibilityTrue()
      zones = await storageController.fetch('zones')
      if (zones === null) {
        // No local copy available.
        updateMessageContent('Havaintoalueiden lataaminen epäonnistui.')
      } else {
        updateMessageContent('Havaintoalueiden lataaminen palvelimelta epäonnistui. Käytetään tallennettuja havaintoalueita.')
      }
    }
    console.log(JSON.stringify(zones))
    props.setObservationZones(zones)
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