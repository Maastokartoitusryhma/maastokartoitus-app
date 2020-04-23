import React from 'react'
import { View, Text, Image, ImageBackground, ScrollView } from 'react-native'
import { Button as ButtonElement, Icon } from 'react-native-elements'
import { useTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import Cs from '../styles/ContainerStyles'
import Bs from '../styles/ButtonStyles'
import Ts from '../styles/TextStyles'
import * as ImagePicker from 'expo-image-picker'
import Colors from '../styles/Colors'


interface Props {
  images: Array<string>
  setImages: Function
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
      props.setImages(props.images.concat(pickerResult.uri))
    }
    return succeeded
  }

  const imageFromLibrary = async () => {
    return attachImage(false)
  }

  const imageFromCamera = async () => {
    return attachImage(true)
  }

  const removeImage = (image: string) => {
    const updatedImages = props.images.filter(i => i !== image)
    props.setImages(updatedImages)
  }

  const renderImages = () => {
    return props.images.map((image: string) =>
      <View key={image} style={Cs.singleImageContainer}>
        <ImageBackground
          source={{ uri: image }}
          style={{ width: 150, height: 150}}
        >
          <View style={Cs.removeIconContainer}>
            <Icon
              name='delete'
              type='material-icons'
              color={Colors.negativeColor}
              size={22}
              onPress={() => {removeImage(image)}}
            />
          </View>
        </ImageBackground>
      </View>
    )
  }

  // If there are less than two images, render buttons next to image
  if (props.images.length < 2) {
    return (
      <View style={Cs.imageElementRowContainer}>
        {props.images.length === 0
          ?
            <View style={Cs.noImageContainer}>
              <Text style={Ts.noImageText}>{t('no image')}</Text>
            </View>
          : 
           renderImages()
        }
        <View style={Cs.imageButtonsColumnContainer}>
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
        </View>
      </View>
    )
  } else {
    return (
      <View style={Cs.imageElementColumnContainer}>
        <View style={Cs.imagesContainer}>
          <ScrollView horizontal={true}>
            {renderImages()}
          </ScrollView>
          <View style={Cs.imageButtonsRowContainer}>
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
          </View>
        </View>
    </View>
    )
  }
}

export default connector(ImagePickerComponent)
/*
<ScrollView horizontal={true}>
        { props.images.map((image: string) =>
          <View key={image} style={Cs.singleImageContainer}>
            <ImageBackground
              source={{ uri: image }}
              style={{ width: 150, height: 150}}
            >
              <View style={Cs.removeIconContainer}>
                <Icon
                  name='delete'
                  type='material-icons'
                  color={Colors.negativeColor}
                  size={22}
                  onPress={() => {removeImage(image)}}
                />
              </View>
            </ImageBackground>
          </View>
        )}
        </ScrollView>
            */