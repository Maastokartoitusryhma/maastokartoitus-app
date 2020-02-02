import React, { useState, useEffect } from 'react'
import MapView, { Marker, Polyline } from 'react-native-maps'
import { connect } from 'react-redux'
import { Button, View } from 'react-native'
import { useTranslation } from 'react-i18next'

const MapComponent = props => {
  const [ regionState, setRegionState ] = useState({ latitude: 64, longitude: 24, latitudeDelta: 0.25, longitudeDelta: 0.25 })
  const [ centered, setCentered ] = useState(true)
  const { t } = useTranslation()

  useEffect(() => {
    if (centered && props.location) {
      followUser()
    }
  })

  let mapView = React.createRef()

  const followUser = () => {
    const region = getRegionFromCoords()
    mapView.animateToRegion(region, 500)
  }

  const getRegionFromCoords = () => {
    if (props.location) {
      const coords = { ...props.location.coords }

      const region = {
        latitude: coords.latitude,
        longitude: coords.longitude,
        latitudeDelta: regionState.latitudeDelta,
        longitudeDelta: regionState.longitudeDelta,
      }

      return region
    }
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

  const onRegionChangeComplete = (region) => {
    setRegionState(region)
  }

  return (
    <>
      <MapView
        ref = {map => {mapView = map}}
        style = { props.mapStyle }
        initialRegion = { regionState }
        onPanDrag = {() => onPanDrag()}
        onRegionChangeComplete = {(region) => onRegionChangeComplete(region)}
      >
        { props.location !== null ?
          <Marker
            coordinate = {{
              latitude: props.location.coords.latitude,
              longitude: props.location.coords.longitude
            }}
          />
          : null
        }
        { props.path.length !== 0 ?
          <Polyline
            coordinates = { props.path.map(location => ({
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }))}
            strokeWidth = { 2 }
          />
          : null
        }
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

const mapStateToProps = (state) => {
  const { location, path } = state
  return { location, path }
}

export default connect(mapStateToProps)(MapComponent)