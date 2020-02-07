import React, { useState, useEffect } from 'react'
import MapView, { Marker, Polyline, UrlTile, Region, LatLng } from 'react-native-maps'
import { connect, ConnectedProps } from 'react-redux'
import { Button, View, Image } from 'react-native'
import { useTranslation } from 'react-i18next'
import { LocationData } from 'expo-location' 

const urlTemplate: string = 'https://proxy.laji.fi/mml_wmts/maasto/wmts/1.0.0/maastokartta/default/WGS84_Pseudo-Mercator/{z}/{y}/{x}.png'
const userLocationPng: string = '../../assets/userLocation.png'

interface RootState {
  location: LocationData
  path: LocationData[]
}

const mapStateToProps = (state: RootState) => {
  const { location, path } = state
  return { location, path }
}

const connector = connect(mapStateToProps)

type PropsFromRedux = ConnectedProps<typeof connector>
type Props = PropsFromRedux & { onPress1: any, mapStyle: any } 

const MapComponent = (props: Props) => {
  const [ regionState, setRegionState ] = useState<Region>({ latitude: 64, longitude: 24, latitudeDelta: 0.25, longitudeDelta: 0.25 })
  const [ centered, setCentered ] = useState(true)
  const { t } = useTranslation()

  useEffect(() => {
    if (centered && props.location) {
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
    if (props.location) {
      const coords : LatLng = { ...props.location.coords }

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

  const onPanDrag = () => {
    centered ? setCentered(false) : null
  }

  const onRegionChangeComplete = (region: Region) => {
    setRegionState(region)
  }


  const locationOverlay = () => (props.location !== null ? (
    <Marker
      coordinate = {{
        latitude: props.location.coords.latitude,
        longitude: props.location.coords.longitude
      }}
      zIndex = {3}>
      <Image source={require(userLocationPng)} style={{ height: 35, width: 35}} />
     </Marker>
    )
    : null
  )

  /** WIP
  const targetOverlay  = () => (!centered ?
    <Marker
      coordinate = {{
        latitude: regionState.latitude,
        longitude: regionState.longitude
      }}
      zIndex = {4}
    />
    : null
  )
  */

  const pathOverlay = () => (props.path.length !== 0 ?
    <Polyline
      coordinates = { props.path.map((location: LocationData) => ({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      }))}
      strokeWidth = {2}
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
        style = { props.mapStyle }
        initialRegion = { regionState }
        onPanDrag = {() => onPanDrag()}
        onRegionChangeComplete = {(region) => onRegionChangeComplete(region)}
        maxZoomLevel = {18}
        minZoomLevel = {0}
      >
        {locationOverlay()}
        {pathOverlay()}
        {tileOverlay()}
      </MapView>
      <View
        style = {{
          position: 'absolute',
          top: '80%',
          alignSelf: 'flex-end'
        }}>
        <Button title = {t('center')} onPress = {() => centerMapAnim()}/>
      </View>
      <View
        style = {{
          position: 'absolute',
          top: '90%',
          alignSelf: 'flex-end'
        }}>
        <Button title = {t('observation')} onPress = { props.onPress1}/>
      </View>
    </>
  )
}

export default connector(MapComponent)
