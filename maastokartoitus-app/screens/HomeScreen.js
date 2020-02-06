import React, { Component } from 'react'
import { Text, View } from 'react-native'
import Colors from '../styles/Colors'
import HomeComponent from '../components/HomeComponent'
import Cs from '../styles/ContainerStyles'
import Ts from '../styles/TextStyles'

export default class HomeScreen extends Component {

  static navigationOptions = ({ screenProps: { t, i18n } }) => ({
    title: t('home page'),
    headerStyle: {
      backgroundColor: Colors.headerBackground,
    },
    headerTintColor: Colors.white,
    headerLeft: () => null,
    headerRight: () =>
      <View style={Cs.languageContainer}>
        <Text style={Ts.languageText} onPress={() => {i18n.changeLanguage('fi')}}>FI</Text>
        <Text style={Ts.languageText} onPress={() => {i18n.changeLanguage('sv')}}>SV</Text>
        <Text style={Ts.languageText} onPress={() => {i18n.changeLanguage('en')}}>EN</Text>
      </View>
  })

  render() {
    return (
      <HomeComponent
        onPressMap={() => this.props.navigation.navigate('Map')}
        onLogout={() => this.props.navigation.replace('Login')}
      />
    )
  }
}