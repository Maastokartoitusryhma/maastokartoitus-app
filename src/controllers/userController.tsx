const accessToken = 'tYsCRgKtaJgeiMTN6y156xMA2pEEwylvLSWywZFKL8ADr3Ver4ZzDMtNBGGnB3aq'
const newAccessToken = 'OIL8AEzGrFMDvhUmOxzLlbZhW71VEFkQF739VdR1cZxiNNldURZo8leRx0uyKbPl'


const getTempTokenAndLoginUrl = async () => {
  const url = `https://fmnh-ws-test.it.helsinki.fi/laji-auth/app-login?access_token=${newAccessToken}`
  const result = await fetch(url, { method: 'GET' })
  return result.json()
}

const postTmpToken = async (tmpToken: string) => {
  const url = `https://fmnh-ws-test.it.helsinki.fi/laji-auth/app-login/check?tmpToken=${tmpToken}&access_token=${newAccessToken}`
  const result = await fetch(url, { method: 'POST' })
  return result.json()
}



const getUserByPersonToken = async (personToken: string) => {
  const url = `https://apitest.laji.fi/v0/person/${personToken}?access_token=${newAccessToken}`
  const fetchResult = await fetch(url, { method: 'GET' })
  return fetchResult.json()
}

export default { getTempTokenAndLoginUrl, postTmpToken, getUserByPersonToken }