import { AsyncStorage } from 'react-native'

const save = async (key: string, value: string) => {
  try {
    const item = JSON.stringify(value)
    await AsyncStorage.setItem(key, item)
    console.log('ASYNC_STORAGE: The following item has been successfully saved: ', item)
  } catch (error) {
    console.log('ASYNC_STORAGE: Failed to save into the storage: ', error)
  }
}

const fetch = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key)
    console.log('ASYNC_STORAGE: Fetched the following item successfully: ', value)
    return value
  } catch (error) {
    console.log('ASYNC_STORAGE: Failed to fetch from the storage: ', error)
  }
}

const clear = async () => {
  try {
    await AsyncStorage.clear()
    console.log('ASYNC_STORAGE: The storage has been cleared.')
  } catch (error) {
    console.log('ASYNC_STORAGE: Failed to clear the storage: ', error)
  }
}

export default { save, fetch, clear }