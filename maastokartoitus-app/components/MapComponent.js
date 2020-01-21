import React, { useState, useEffect } from 'react'
import MapView, { Marker } from 'react-native-maps'
import * as Location from 'expo-location'
import * as Permissions from 'expo-permissions'

export default MapComponent = ({ style }) => {
    [ locationState, setLocationState ] = useState({ location: null, region: {latitude: 62.0, longitude: -27.0, latitudeDelta: 1.0, longitudeDelta: 1.0}, errorMsg: null })
    
    useEffect(() => {
        getLocation()    
    }, [])

    getLocation = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);

        if(status !== 'granted') {
            setLocationState({ location: null, region: null, errorMsg: 'Location permission denied' })
        }

        let location = await Location.getCurrentPositionAsync({})
        const region = {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 1.0,
            longitudeDelta: 1.0,
        }

        setLocationState({ location, region, errorMsg: null });
    }

    return (
        <>
            <MapView 
                style = {style}
                region = {locationState.region}
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