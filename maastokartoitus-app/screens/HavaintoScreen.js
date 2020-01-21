import React, { Component } from 'react'
import { View, Text } from 'react-native' 

export default class HavaintoScreen extends Component {
  static navigationOptions = {
    title: 'Lisää havainto'
  }

  render() {
    
    return (
      <View>
        <Text>Täällä lisätään uusi havainto</Text>
      </View>
    )
  }
}
