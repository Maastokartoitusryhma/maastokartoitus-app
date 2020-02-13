import { AsyncStorage, Alert } from 'react-native'

const save = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem(key, value)
    Alert.alert('Tallennus onnistui')
  } catch (error) {
    Alert.alert('Failed to save into the local storage. ', error)
  }
}

const fetch = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key)
    Alert.alert(value)
  } catch (error) {
    Alert.alert('Failed to fetch from the local storage. ', error)
  }
}

const clear = async () => {
  try {
    await AsyncStorage.clear()
    Alert.alert('Nollaus onnistui')
  } catch (error) {
    Alert.alert('Failed to clear the local storage. ', error)
  }
}

export default { save, fetch, clear }