import React, { useState, useEffect } from 'react'
import MapView, { Marker, Polyline, UrlTile, Region, LatLng } from 'react-native-maps'
import { connect, ConnectedProps } from 'react-redux'
import { Button, View, Image, Dimensions, TouchableHighlight } from 'react-native'
import { useTranslation } from 'react-i18next'
import { LocationData } from 'expo-location'
import { setObservationLocation, clearObservationLocation } from '../stores/observation/actions' 
import Colors from '../styles/Colors'
import { MaterialIcons } from '@expo/vector-icons'


const urlTemplate: string = 'https://proxy.laji.fi/mml_wmts/maasto/wmts/1.0.0/maastokartta/default/WGS84_Pseudo-Mercator/{z}/{y}/{x}.png'
const userLocationPng: string = '../../assets/userLocation.png'

interface RootState {
  position: LocationData
  path: LocationData[]
  observation: LatLng
  zone: LatLng[]
}

const mapStateToProps = (state: RootState) => {
  const { position, path, observation, zone } = state
  return { position, path, observation, zone }
}

const mapDispatchToProps = {
  setObservationLocation,
  clearObservationLocation,
}

const connector = connect(
  mapStateToProps,
  mapDispatchToProps
)

type PropsFromRedux = ConnectedProps<typeof connector>
type Props = PropsFromRedux & { onPress1: () => void } 

const MapComponent = (props: Props) => {
  const [ regionState, setRegionState ] = useState<Region>({ latitude: 60, longitude: 24, latitudeDelta: 0.25, longitudeDelta: 0.25 })
  const [ centered, setCentered ] = useState(true)
  const [ mapType, setMapType ] = useState('none')
  const { t } = useTranslation()

  useEffect(() => {
    if (centered && props.position) {
      followUser()
    }
  })

  let mapView : MapView | null

  const followUser = () => {
    const region = getRegionFromCoords()

    if (region && mapView) {
      mapView.animateToRegion(region, 500)
    }
  }

  const getRegionFromCoords = () => {
    if (props.position) {
      const coords : LatLng = { ...props.position.coords }

      const region : Region = {
        latitude: coords.latitude,
        longitude: coords.longitude,
        latitudeDelta: regionState.latitudeDelta,
        longitudeDelta: regionState.longitudeDelta,
      }

      return region
    }

    return null
  }

  const centerMapAnim = () => {
    centered ? null : setCentered(true)

    const region = getRegionFromCoords()

    if (mapView && region) {
      mapView.animateToRegion(region, 500)
    }
  }

  const switchMap = () => {
    mapType === 'none' ? 
      setMapType('satellite')
      : setMapType('none')
  }

  const onPanDrag = () => {
    centered ? setCentered(false) : null
  }

  const onRegionChangeComplete = (region: Region) => {
    setRegionState(region)
  }

  const markObservation = (coordinate: LatLng) => {
    props.setObservationLocation(coordinate)
  }

  const cancelObservation = () => {
    props.clearObservationLocation()
  }

  const locationOverlay = () => (props.position !== null ? (
    <Marker
      coordinate = {{
        latitude: props.position.coords.latitude,
        longitude: props.position.coords.longitude
      }}
      zIndex = {3}>
      <MaterialIcons 
        name='directions-walk' 
        size={50}
      />
    </Marker>
    )
    : null
  )

  const targetOverlay  = () => (props.observation ?
    <Marker
      coordinate = {{
        latitude: props.observation.latitude,
        longitude: props.observation.longitude
      }}
      zIndex = {4}
    />
    : null
  )

  const pathOverlay = () => (props.path.length !== 0 ?
    <Polyline
      coordinates = { props.path.map((location: LocationData) => ({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      }))}
      strokeWidth = {5}
      strokeColor = {Colors.red}
      zIndex = {2}
    />
    : null
  )

  const tileOverlay = () => (
    <UrlTile
      urlTemplate = {urlTemplate}
      zIndex = {1}
    />
  )

  return (
    <>
      <MapView
        ref = {map => {mapView = map}}
        provider = {'google'}
        initialRegion = { regionState }
        onPanDrag = {() => onPanDrag()}
        onLongPress = {(event) => markObservation(event.nativeEvent.coordinate)}
        onRegionChangeComplete = {(region) => onRegionChangeComplete(region)}
        maxZoomLevel = {18}
        minZoomLevel = {0}
        mapType = {mapType}
        style = {{
          width: Dimensions.get('window').width,
          height: Dimensions.get('window').height,
        }}
      >
        {locationOverlay()}
        {targetOverlay()}
        {pathOverlay()}
        {mapType === 'none' ? tileOverlay() : null}
      </MapView>
      <View
        style = {{
          position: 'absolute',
          top: '0%',
          alignSelf: 'flex-end'
        }}>
        <TouchableHighlight onPress = {() => switchMap()}>
          <MaterialIcons
            name='layers'
            size={50}
          />
        </TouchableHighlight>
      </View>
      <View
        style = {{
          position: 'absolute',
          top: '10%',
          alignSelf: 'flex-end'
        }}>
        <TouchableHighlight onPress = {() => centerMapAnim()}>
          <MaterialIcons
            name='my-location'
            size={50}
          />
        </TouchableHighlight>
      </View>
      { props.observation ?
        <View
          style = {{
            position: 'absolute',
            width: '100%',
            bottom: '0%',
            flexDirection: 'row',
            justifyContent: 'space-between'
          }}>
          <View
            style={{
              alignSelf: 'flex-start',
            }}>
            <Button title = {t('cancel')} onPress = {() => cancelObservation()}/>
          </View>
          <View
            style={{
              alignSelf: 'flex-end',       
            }}>
            <Button title = {t('observation')} onPress = {props.onPress1}/>
          </View>
        </View>
        : null
      }
    </>
  )
}

export default connector(MapComponent)
