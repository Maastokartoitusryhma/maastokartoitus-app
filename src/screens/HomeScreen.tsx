import React, { Component } from 'react'
import { Text, View } from 'react-native'
import Colors from '../styles/Colors'
import HomeComponent from '../components/HomeComponent'
import Cs from '../styles/ContainerStyles'
import Ts from '../styles/TextStyles'
import { NavigationStackProp, NavigationStackScreenProps } from 'react-navigation-stack'

type Props  = {
  navigation: NavigationStackProp
}

type ScreenProps = { screenProps: any}

export default class HomeScreen extends Component<NavigationStackScreenProps<Props, ScreenProps>> {

  static navigationOptions = ({ screenProps }: ScreenProps) =>  ({
    title: screenProps.t('home page'),
    headerStyle: {
      backgroundColor: Colors.headerBackground,
    },
    headerTintColor: Colors.white,
    headerLeft: () => null,
    headerRight: () =>
      <View style={Cs.languageContainer}>
        <Text style={Ts.languageText} onPress={() => {screenProps.i18n.changeLanguage('fi')}}>FI</Text>
        <Text style={Ts.languageText} onPress={() => {screenProps.i18n.changeLanguage('sv')}}>SV</Text>
        <Text style={Ts.languageText} onPress={() => {screenProps.i18n.changeLanguage('en')}}>EN</Text>
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