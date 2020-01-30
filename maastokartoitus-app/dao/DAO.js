import { AsyncStorage } from 'react-native'

export const save = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value) //JSON.stringify(value)???
  } catch (error) {
    alert('Failed to save into async storage. ', error)
  }
  return null
}

export const fetch = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key)
    if (value !== null) {
      return value
    }
  } catch (error) {
    alert('Failed to fetch from async storage. ', error)
  }
}

export const clear = async () => {
  try {
    await AsyncStorage.clear()
  } catch (error) {
    alert('Failed to clear the async storage. ', error)
  }
}
