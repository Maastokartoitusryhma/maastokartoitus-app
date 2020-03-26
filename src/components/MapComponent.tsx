import React, { useEffect } from 'react'
import MapView, { Marker, Polyline, UrlTile, Region, LatLng } from 'react-native-maps'
import { connect, ConnectedProps } from 'react-redux'
import { Button, View, TouchableHighlight } from 'react-native'
import { useTranslation } from 'react-i18next'
import { LocationData } from 'expo-location'
import { GeometryCollection, Point } from 'geojson'
import { wrapGeometryInFC, convertGC2FC, convertLatLngToPoint } from '../converters/geoJSONConverters'
import Geojson from 'react-native-typescript-geojson'
import { 
  setObservationLocation, 
  clearObservationLocation, 
  addToObservationLocations,
  removeFromObservationLocations
} from '../stores/observation/actions' 
import {
  setRegion,
  toggleCentered,
  toggleMaptype,
  toggleEditing,
} from '../stores/map/actions'
import Colors from '../styles/Colors'
import { MaterialIcons } from '@expo/vector-icons'
import Cs from '../styles/ContainerStyles'
import Os from '../styles/OtherStyles'
import uuid from 'react-native-uuid'

const urlTemplate: string = 'https://proxy.laji.fi/mml_wmts/maasto/wmts/1.0.0/maastokartta/default/WGS84_Pseudo-Mercator/{z}/{y}/{x}.png'

interface RootState {
  position: LocationData
  path: LocationData[]
  region: Region
  observation: Point
  observationLocations: Point[]
  zone: GeometryCollection
  centered: boolean
  maptype: 'topographic' | 'satellite'
  editing: boolean
}

const mapStateToProps = (state: RootState) => {
  const { position, path, region, observation, observationLocations, zone, centered, maptype, editing } = state
  return { position, path, region, observation, observationLocations, zone, centered, maptype, editing }
}

const mapDispatchToProps = {
  setRegion,
  setObservationLocation,
  addToObservationLocations,
  removeFromObservationLocations,
  clearObservationLocation,
  toggleCentered,
  toggleMaptype,
  toggleEditing,
}

const connector = connect(
  mapStateToProps,
  mapDispatchToProps
)

type PropsFromRedux = ConnectedProps<typeof connector>
type Props = PropsFromRedux & { 
  onPressObservation: () => void, 
  onPressTrackObservation: () => void, 
  onPressFecesObservation: () => void, 
  onPressNestObservation: () => void,
  onPressEditing: () => void,
} 

const MapComponent = (props: Props) => {
  const { t } = useTranslation()

  //if centering is true keeps recentering the map on renders
  useEffect(() => {
    if (props.centered && props.position) {
      followUser()
    }
  })

  //reference for mapView
  let mapView: MapView | null = null

  //animates map to given region
  const moveToRegion = (region: Region | null) => {
    if (region && mapView) {
      mapView.animateToRegion(region, 500)
    }
  }

  //gets user region and moves map to themr
  const followUser = () => {
    const region = getRegionFromCoords()
    moveToRegion(region)
  }

  //extracts user coordinates from geolocationdata, and converts to region-type
  //for map view
  const getRegionFromCoords = () => {
    if (props.position) {
      const coords : LatLng = { ...props.position.coords }

      const region : Region = {
        latitude: coords.latitude,
        longitude: coords.longitude,
        latitudeDelta: props.region.latitudeDelta,
        longitudeDelta: props.region.longitudeDelta,
      }

      return region
    }

    return null
  }

  //centers the map on user and sets the centering flag to true
  const centerMapAnim = () => {
    props.centered ? null : props.toggleCentered()

    followUser()
  }

  //releases mapcenter from userlocation on moving the map
  const onPanDrag = () => {
    props.centered ? props.toggleCentered() : null
  }

  const onRegionChangeComplete = (region: Region) => {
    props.setRegion(region)
  }

  //on long press on map converts selected location to point and places in observation location reducer 
  const markObservation = (coordinate: LatLng) => {
    const point = convertLatLngToPoint(coordinate)
    props.setObservationLocation(point)
  }

  //clears observation location from its reducer, and removes it from the list
  //of locations in observationEvent
  const cancelObservation = () => {
    props.removeFromObservationLocations(props.observation)
    props.clearObservationLocation()
  }

  //redirects navigator back to edit page of single observation
  const submitEdit = () => {
    props.onPressEditing()
  }

  //redirects navigator back to edit page, sets edit-flag to false and clears
  //selected observation location from reducer
  const cancelEdit = () => {
    props.clearObservationLocation()
    props.toggleEditing()
    props.onPressEditing()
  }

  const locationOverlay = () => (props.position !== null ? (
    <Marker
      onPress={(event) => markObservation(event.nativeEvent.coordinate)}
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

  const pathOverlay = () => (props.path.length !== 1 ?
    <Polyline
      coordinates = { props.path.map((location: LocationData) => ({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      }))}
      strokeWidth = {5}
      strokeColor = {Colors.red}
      zIndex = {1}
    />
    : null
  )

  const targetOverlay  = () => (props.observation ?
    <Geojson 
      geojson = {wrapGeometryInFC(props.observation)}
    />
    : null
  )

  const zoneOverlay = () => (props.zone ?
    <Geojson 
      geojson = {convertGC2FC(props.zone)}
      fillColor = "#f002"
      pinColor = "#f00"
      strokeColor = "#f00"
      strokeWidth = {4}
    />
    : null
  )

  const tileOverlay = () => (props.maptype === 'topographic' ?
      <UrlTile
        urlTemplate = {urlTemplate}
        zIndex = {-1}
      />
    : null
  )

  const observationLocationsOverlay = () => (
    props.observationLocations.map(location =>
      <Geojson key={uuid.v4()} geojson={wrapGeometryInFC(location)} />
    )
  )

  const observationButtonsOverlay = () => (        
    <View style = {Cs.observationTypeButtonsContainer}>
      <View
        style={Cs.observationTypeButtonsColumn}>
          {props.editing ?
            <>
              <View style={Cs.observationTypeButton}>
                <Button title = {t('submit')} onPress = {() => submitEdit()}/>
              </View>
              <View>
                <Button title = {t('cancel')} onPress = {() => cancelEdit()}/>
              </View>
            </> :
            <>
              <View style={Cs.observationTypeButton}>
                <Button title = {t('observation')} onPress = {props.onPressObservation}/>
              </View>
              <View style={Cs.observationTypeButton}>
                <Button title = {t('trace')} onPress = {props.onPressTrackObservation}/>
              </View>
              <View style={Cs.observationTypeButton}>
              <Button title = {t('feces')} onPress = {props.onPressFecesObservation}/>
              </View>
              <View style={Cs.observationTypeButton}>
                <Button title = {t('nest')} onPress = {props.onPressNestObservation}/>
              </View>
              <View style={Cs.observationTypeButton}>
                <Button title = {t('remove')} onPress = {() => cancelObservation()} color = {Colors.negativeButton}/>
              </View>
            </>
          }
      </View>
    </View>
  )

  return (
    <>
      <MapView
        ref = {map => {mapView = map}}
        provider = {'google'}
        initialRegion = { props.region }
        onPanDrag = {() => onPanDrag()}
        onLongPress = {(event) => markObservation(event.nativeEvent.coordinate)}
        onRegionChangeComplete = {(region) => onRegionChangeComplete(region)}
        maxZoomLevel = {18.9}
        minZoomLevel = {5}
        mapType = {props.maptype === 'topographic' ? 'none' : props.maptype}
        rotateEnabled = {false}
        style = {Cs.mapViewStyle}
      >
        {locationOverlay()}
        {targetOverlay()}
        {pathOverlay()}
        {zoneOverlay()}
        {tileOverlay()}
        {observationLocationsOverlay()}
      </MapView>
      <View
        style = {Cs.mapTypeContainer}>
        <TouchableHighlight onPress = {() => props.toggleMaptype()} style = {Os.touchableHiglightStyle}>
          <MaterialIcons
            name='layers'
            size={50}
            color='white'
          />
        </TouchableHighlight>
      </View>
      <View
        style = {Cs.userLocationContainer}>
        <TouchableHighlight onPress = {() => centerMapAnim()} style = {Os.touchableHiglightStyle}>
          <MaterialIcons
            name='my-location'
            size={50}
            color='white'
          />
        </TouchableHighlight>
      </View>
      { props.observation ?
        observationButtonsOverlay()
        : null
      }
      
    </>
  )
}

export default connector(MapComponent)
