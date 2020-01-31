import { AsyncStorage } from 'react-native'

const save = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value)
    return value
  } catch (error) {
    alert('Failed to save into the local storage. ', error)
  }
}

const fetch = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key)
    if (value !== null) {
      return value
    }
  } catch (error) {
    alert('Failed to fetch from the local storage. ', error)
  }
}

const clear = async () => {
  try {
    await AsyncStorage.clear()
  } catch (error) {
    alert('Failed to clear the local storage. ', error)
  }
}

export default { save, fetch, clear }