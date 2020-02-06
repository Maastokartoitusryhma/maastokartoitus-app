import { AsyncStorage } from 'react-native'

const save = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value)
    alert('Tallennus onnistui')
  } catch (error) {
    alert('Failed to save into the local storage. ', error)
  }
}

const fetch = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key)
    alert(value)
  } catch (error) {
    alert('Failed to fetch from the local storage. ', error)
  }
}

const clear = async () => {
  try {
    await AsyncStorage.clear()
    alert('Nollaus onnistui')
  } catch (error) {
    alert('Failed to clear the local storage. ', error)
  }
}

export default { save, fetch, clear }