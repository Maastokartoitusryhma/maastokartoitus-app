import React from 'react'
import WebView from 'react-native-webview'

type Props = {
  loginURL: string
}

const WebViewComponent = (props: Props) => {
  return (
    <WebView source={{ uri: `${props.loginURL}` }} />
  )
}

export default WebViewComponent