import { AsyncStorage } from 'react-native'

const save = async (key: string, value: any) => {
  try {
    const item = JSON.stringify(value)
    await AsyncStorage.setItem(key, item)
  } catch (error) {
    console.log('ASYNC_STORAGE: Failed to save into the storage: ', error)
  }
}

const fetch = async (key: string) => {
  try {
    const value: string|null = await AsyncStorage.getItem(key)
    if (value !== null) {
      return JSON.parse(value)
    } else {
      return null
    }
  } catch (error) {
    console.log('ASYNC_STORAGE: Failed to fetch from the storage: ', error)
  }
}

const getKeys = async () => {
  const allKeys: Array<string> = await AsyncStorage.getAllKeys()
  return allKeys
}

const remove = async (key: string) => {
  await AsyncStorage.removeItem(key)
}

//Caution! Removes ALL stored keys from the storage!
const clear = async () => {
  try {
    await AsyncStorage.clear()
  } catch (error) {
    console.log('ASYNC_STORAGE: Failed to clear the storage: ', error)
  }
}

export default { save, fetch, getKeys, remove, clear }