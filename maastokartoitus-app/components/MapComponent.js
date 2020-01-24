import React, { useState, useEffect } from 'react'
import MapView, { Marker } from 'react-native-maps'
import { connect } from 'react-redux'
import { updateLocation } from '../actions/LocationActions'
import { bindActionCreators } from 'redux'
import { Text, Button } from 'react-native'

const MapComponent = props => {
  const [ regionState, setRegionState ] = useState(null)

  centerMap = () => {
    if (props.location) {
      const coords = { ...props.location.coords }

      const region = {
        latitude: coords.latitude,
        longitude: coords.longitude,
        latitudeDelta: 0.25,
        longitudeDelta: 0.25,
      }

      setRegionState(region)
    }
  }

  return (
    <>
      <MapView
        style = {props.style}
        region = {regionState}
      >
        {props.location !== null ?
          <Marker
            coordinate = {{
              latitude: props.location.coords.latitude,
              longitude: props.location.coords.longitude
            }}
          />
          : null
        }
      </MapView>
    </>
  )
}

const mapStateToProps = (state) => {
  const { location } = state
  return { location }
}

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    updateLocation
  }, dispatch)
)
export default connect(mapStateToProps, mapDispatchToProps)(MapComponent)