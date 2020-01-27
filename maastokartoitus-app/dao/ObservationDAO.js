import { AsyncStorage } from 'react-native'

export const save = async (data) => {
  const observation_id_1 = {
    species: data.species,
    location: data.location,
    date: data.date,
    time: data.time,
    info: data.info
  }
  try {
    await AsyncStorage.setItem('observation_id_1', JSON.stringify(observation_id_1))
  } catch (error) {
    alert('Failed to save into async storage. ', error)
  }
  return null
}

export const fetch = async () => {
  try {
    const fetchedObservation = await AsyncStorage.getItem('observation_id_1')

    if (fetchedObservation !== null) {
      alert(JSON.stringify(fetchedObservation))
      return null
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
