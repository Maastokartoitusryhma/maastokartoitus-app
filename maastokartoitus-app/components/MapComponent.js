import React, { useState } from 'react'
import MapView, { Marker, Polyline } from 'react-native-maps'
import { connect } from 'react-redux'
import { updateLocation } from '../actions/LocationActions'
import { bindActionCreators } from 'redux'
import { Text, Button, View } from 'react-native'

const MapComponent = props => {
  const [ regionState, setRegionState ] = useState(null)

  const centerMap = () => {
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
        style = { props.mapStyle }
        region = { regionState }
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
        <Button title = { 'Keskitä' } onPress = { () => centerMap() } />
      </View>
      <View
        style = {{
          position: 'absolute',
          top: '90%',
          alignSelf: 'flex-end'
        }}>
        <Button onPress = { props.onPress1 } title = 'Havainto' />
      </View>
    </>
  )
}

const mapStateToProps = (state) => {
  const { location, path } = state
  return { location, path }
}

//const mapDispatchToProps = dispatch => (
//  bindActionCreators({
//    updateLocation
//  }, dispatch)
//)

export default connect(mapStateToProps)(MapComponent)