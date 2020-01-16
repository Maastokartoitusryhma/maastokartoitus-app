import React, { Component, useState } from 'react';
import { StyleSheet, Text, View, Button, Dimensions } from 'react-native';
import MapView from 'react-native-maps'
import * as Location from 'expo-location'
import * as Permissions from 'expo-permissions'

export default class App extends Component {
    state = {
        location: null,
        errorMsg: null,
    }

    getLocation = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);

        if(status !== 'granted') {
            this.setState({ errorMsg: 'Location permission denied' })
        }

        let location = await Location.getCurrentPositionAsync({})
        this.setState({ location });
    }

    componentWillMount() {
        this.getLocation();
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>{JSON.stringify(this.state.location)}</Text>
                <MapView style={styles.mapStyle}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapStyle: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
  },
});
