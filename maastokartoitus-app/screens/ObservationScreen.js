import React, { Component } from 'react'
import ObservationComponent from '../components/ObservationComponent'
import Colors from '../constants/colors'

export default class ObservationScreen extends Component {

  static navigationOptions = ({ screenProps: { t } }) => ({
    title: t('add observation'),
    headerStyle: {
      backgroundColor: Colors.headerBackground
    },
    headerTintColor: Colors.white
  })

  render() {
    return (
      <ObservationComponent />
    )
  }
}
