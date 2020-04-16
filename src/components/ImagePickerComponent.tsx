import React from 'react'
import { View, Text, Image } from 'react-native'
import { Button as ButtonElement, Icon } from 'react-native-elements'
import { useTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import Cs from '../styles/ContainerStyles'
import Bs from '../styles/ButtonStyles'
import Ts from '../styles/TextStyles'
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

  const removeImage = () => {
    props.setImage('')
  }

  return (
    <View style={ Cs.imageContainer }>
      { props.image !== ''
        ?
          <Image
            source={{ uri: props.image }}
            style={{ width: 150, height: 150 }}
          />
        :
          <View style={Cs.noImageContainer}>
            <Text style={Ts.noImageText}>{t('no image')}</Text>
          </View>
      }
      <View style={Cs.imageButtonsContainer}>
        <ButtonElement
          buttonStyle={Bs.addImageButton}
          containerStyle={Cs.padding5Container}
          title={t('choose image')}
          iconRight={true}
          icon={<Icon name='photo-library' type='material-icons' color='white'  size={22} />}
          onPress={imageFromLibrary}
        />
        <ButtonElement
          buttonStyle={Bs.addImageButton}
          containerStyle={Cs.padding5Container}
          title={t('use camera')}
          iconRight={true}
          icon={<Icon name='add-a-photo' type='material-icons' color='white'  size={22} />}
          onPress={imageFromCamera}
        />
        { props.image !== ''
          ?
            <ButtonElement
              buttonStyle={Bs.removeImageButton}
              containerStyle={Cs.padding5Container}
              title={t('remove image')}
              iconRight={true}
              icon={<Icon name='delete' type='material-icons' color='white'  size={22} />}
              onPress={removeImage}
            />
          :
            null
        }
      </View>
    </View>
  )
}

export default connector(ImagePickerComponent)
