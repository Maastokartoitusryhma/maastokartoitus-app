import axios from 'axios'
import { Alert } from 'react-native'

const accessToken = 'R7uWGymPsmJ2ItzJphThYBcqLc6dBVDBfdUEGSRYq8aChwRvi34zvfJyrXTTUHFB'

const getRegions = async () => {
  const url = `https://apitest.laji.fi/v0/named-places?collectionID=HR.2951&includePublic=true&includeUnits=false&access_token=${accessToken}`
  try {
    const fetchResult = await axios.get(url)
    return fetchResult.data
  } catch (error) {
    Alert.alert(error)
    return null
  } 
}

export default { getRegions }