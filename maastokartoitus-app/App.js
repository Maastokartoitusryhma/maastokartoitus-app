import React, { Component } from 'react';
import { StyleSheet, View, Button, Dimensions } from 'react-native';
import MapComponent from './components/MapComponent'

export default class App extends Component {
    render() {
        return (
            <View style={styles.container}>
                <MapComponent style={styles.mapStyle}/>
                <View style={styles.buttonContainer}>
                    <Button title="Lisää havainto" />
                </View>
            </View>
        )
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
  buttonContainer: {
      position: 'absolute',
      bottom: 20,
      right: 20
  }
});
