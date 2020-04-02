import React, { useState, useEffect } from 'react'
import { View, Text, ScrollView, Button, Alert, Image } from 'react-native'
import { useTranslation } from 'react-i18next'
import { connect, ConnectedProps } from 'react-redux'
import Cs from '../styles/ContainerStyles'
import Colors from '../styles/Colors'
import * as ImagePicker from 'expo-image-picker'


interface Props {
  image: string
  setImage: Function
}

const connector = connect()

const ImagePickerComponent = (props: Props) => {

  const { t } = useTranslation()

  const attachImage = async (useCamera: boolean) => {

    let permissionResult = null
    if (useCamera) {
      permissionResult = await ImagePicker.requestCameraPermissionsAsync()
    } else {
      permissionResult = await ImagePicker.requestCameraRollPermissionsAsync()
    }
    if (permissionResult.granted === false) {
      return false
    }

    let pickerResult = null
    if (useCamera) {
      pickerResult = await ImagePicker.launchCameraAsync()
    } else {
      pickerResult = await ImagePicker.launchImageLibraryAsync()
    }

    let succeeded : boolean = !pickerResult.cancelled
    if (succeeded) {
      props.setImage(pickerResult.uri)
    }
    return succeeded
  }

  const imageFromLibrary = async () => {
    return attachImage(false)
  }

  const imageFromCamera = async () => {
    return attachImage(true)
  }

  return (
    <View style={Cs.formSaveButtonContainer}>
      <Button title={t('attach image')} onPress={imageFromLibrary} color={Colors.positiveButton} />
      <Button title={t('use camera')} onPress={imageFromCamera} color={Colors.positiveButton} />
      { props.image !== ''
        ?
          <Image
            source={{ uri: props.image }}
            style={{ width: 100, height: 100 }}
          />
        :
          null
      }
    </View>
  )
}

export default connector(ImagePickerComponent)