import React, { useEffect} from 'react'
import WebView from 'react-native-webview'

type Props = {
  loginURL: string
  onTimeout: () => void
}

const WebViewComponent = (props: Props) => {

  //Setting timeout in injected JS code
  const injectedJS = `
  setTimeout(function() {
    window.ReactNativeWebView.postMessage('stop')
  }, 180000)
  `
    
  //In case of timeout, redirect back to LoginScreen
  return (
    <WebView 
    injectedJavaScript={injectedJS}
    onMessage={event => {
      props.onTimeout()
    }}
    source={{ uri: `${props.loginURL}` }} 
    />
  )
}

export default WebViewComponent