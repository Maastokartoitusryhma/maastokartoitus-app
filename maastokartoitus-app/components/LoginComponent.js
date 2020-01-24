import React from 'react'
import { View, Button, Text, TextInput, StyleSheet } from 'react-native'
import Colors from '../constants/colors'

const LoginComponent = (props) => {

  return (
    <View>
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <Text style={styles.text}>Syötä henkilökohtainen tokenisi</Text>
          <TextInput placeholder='personToken' style={styles.input} />
        </View>
        <View style={styles.button}>
          <Button onPress={props.onPress} title="Kirjaudu sisään" color={Colors.neutralButton}/>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: '45%'
  },
  button: {
    width: '50%',
    padding: 10,
  },
  inputContainer: {
    width: '90%',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  input: {
    borderColor: Colors.inputBorder,
    borderWidth: 1,
    height: 40,
    width: '80%',
    padding: 10
  },
  text: {
    textAlign: 'center',
    padding: 10
  }
})

export default LoginComponent