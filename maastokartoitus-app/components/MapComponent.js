import React, { useState, useEffect } from 'react'
import MapView, { Marker } from 'react-native-maps'
import * as Location from 'expo-location'
import * as Permissions from 'expo-permissions'
import * as TaskManager from 'expo-task-manager'
import { Button, Text } from 'react-native'

export default MapComponent = ({ style }) => {
  const [ regionState, setRegionState ] = useState({ latitude: 62.0, longitude: -27.0, latitudeDelta: 0.25, longitudeDelta: 0.25 })
  const [ locationState, setLocationState ] = useState({ location: null, errorMsg: null })

  useEffect(() => {
    watchLocationAsync()
  }, [])

  watchLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION)

    if(status !== 'granted') {
      setLocationState({ location: null, errorMsg: 'Location permission denied' })
    }

    initialLocation = await Location.getCurrentPositionAsync({})

    const region = {
      latitude: initialLocation.coords.latitude,
      longitude: initialLocation.coords.longitude,
      latitudeDelta: 0.25,
      longitudeDelta: 0.25,
    }

    setRegionState(region)

    await Location.watchPositionAsync({
      distanceInterval: 10,
      timeInterval: 5000
    },
    location => {
      setLocationState({ location, errorMsg: null })
    })
  }

  //centerMap = () => {
  //    const region = {...regionState}
  //    const coords = {...locationState.location.coords}

  //    region.latitude = coords.latitude
  //    region.longitude = coords.latitude

  //    setRegionState(region)
  //}

  return (
    <>
      <MapView
        style = {style}
        region = {regionState}
      >
        {locationState.location !== null ?
          <Marker
            coordinate = {{
              latitude: locationState.location.coords.latitude,
              longitude: locationState.location.coords.longitude
            }}
          />
          : null
        }
      </MapView>
    </>
  )
}