const accessToken = 'tYsCRgKtaJgeiMTN6y156xMA2pEEwylvLSWywZFKL8ADr3Ver4ZzDMtNBGGnB3aq'

const getUserByPersonToken = async (personToken: string) => {
  const url = `https://api.laji.fi/v0/person/${personToken}?access_token=${accessToken}`
  const fetchResult = await fetch(url, { method: 'GET' })
  return fetchResult.json()
}

export default { getUserByPersonToken }