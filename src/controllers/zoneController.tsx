import axios from 'axios'

const accessToken = 'R7uWGymPsmJ2ItzJphThYBcqLc6dBVDBfdUEGSRYq8aChwRvi34zvfJyrXTTUHFB'

const getZones = async () => {
  const url = `https://apitest.laji.fi/v0/named-places?collectionID=HR.2951&includePublic=true&includeUnits=false&access_token=${accessToken}`
  try {
    const fetchResult = await axios.get(url)
    return fetchResult.data.results
  } catch (error) {
    return null
  } 
}

export default { getZones }