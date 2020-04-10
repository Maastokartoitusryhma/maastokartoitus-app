import React, { useEffect } from 'react'
import WebView from 'react-native-webview'
import userController from '../controllers/userController'
import storageController from '../controllers/storageController'
import { connect, ConnectedProps } from 'react-redux'
import { setUser, setPersonToken } from '../stores/user/actions'

type UserObject = {
  id: string
  fullName: string
  emailAddress: string
  defaultLanguage: string
}

interface RootState {
  user: UserObject,
  token: string
}

const mapStateToProps = (state: RootState) => {
  const { user, token } = state
  return { user, token }
}

const mapDispatchToProps = {
  setUser,
  setPersonToken
}

const connector = connect(
  mapStateToProps,
  mapDispatchToProps,
)

type PropsFromRedux = ConnectedProps<typeof connector>

type Props = PropsFromRedux & {
  result: any
  onTimeout: () => void
  callback: any
}

const WebViewComponent = (props: Props) => {

  let timer: any

  useEffect(() => {
    // Polling login request every 3 seconds
    timer = setInterval(() => {
      pollPostRequest(props.result.tmpToken) 
    }, 3000)
  }, [])

  // Setting timeout in injected JS code
  const injectedJS = `
  setTimeout(function() {
    window.ReactNativeWebView.postMessage('stop')
  }, 180000)
  `

  const pollPostRequest = async (tmpToken: string) => {
    console.log('run poll')
    props.callback(timer)
    const result = await userController.postTmpToken(tmpToken)
    if (result.token !== undefined) { // Check if login is successful and personToken is returned in result
      const userData = await getUserInfo(result.token)
      await storeUserData(userData, result.token)
    }
  }


  // Fetch user info from API
  const getUserInfo = async (token: string) => {
    const userObject = await userController.getUserByPersonToken(token)
    if (userObject.error === undefined) {
      return userObject
    } else {
      console.log('SOME ERROR')
    }
  }

  // Store fetched user info to storage and reducer
  const storeUserData = async (userData: UserObject, personToken: string) => {
    try {
      await storageController.save('userData', userData)
      await storageController.save('personToken', personToken)
      props.setUser(userData)
      props.setPersonToken(personToken)
    } catch (e) {
      console.log('Error saving user data to storage or reducer: ', e)
    }
  }
    
  // In case of timeout, redirect back to LoginScreen
  return (
    <WebView 
    injectedJavaScript={injectedJS}
    onMessage={() => {
      props.onTimeout()
    }}
    source={{ uri: `${props.result.loginURL}` }} 
    />
  )
}

export default connector(WebViewComponent)