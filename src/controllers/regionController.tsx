const accessToken = 'R7uWGymPsmJ2ItzJphThYBcqLc6dBVDBfdUEGSRYq8aChwRvi34zvfJyrXTTUHFB'

const getRegions = async () => {
  const url = `https://apitest.laji.fi/v0/named-places?collectionID=HR.2951&includePublic=true&includeUnits=false&access_token=${accessToken}`
  const fetchResult = await fetch(url, { method: 'GET' })
  return fetchResult.json()
}

export default { getRegions }