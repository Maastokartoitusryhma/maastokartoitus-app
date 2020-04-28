import axios from 'axios'

const accessToken = 'OIL8AEzGrFMDvhUmOxzLlbZhW71VEFkQF739VdR1cZxiNNldURZo8leRx0uyKbPl'

export const getTempTokenAndLoginUrl = async () => {
  const url = `https://fmnh-ws-test.it.helsinki.fi/laji-auth/app-login?access_token=${accessToken}`
  try {
    //const result = await axios.get(url)
    const result = await fetch(url, { method: 'GET' })
    return result.json()
  } catch (error) {
    console.log('Error:', error)
    return null
  }
}

export const postTmpToken = async (tmpToken: string) => {
  const url = `https://fmnh-ws-test.it.helsinki.fi/laji-auth/app-login/check?tmpToken=${tmpToken}&access_token=${accessToken}`
  try {
    const result = await axios.post(url)
    //successfully received the token
    return result.data
  } catch (error) {
    //did not get the token in this poll
    return { token: undefined }
  }
}

export const getUserByPersonToken = async (personToken: string) => {
  const url = `https://apitest.laji.fi/v0/person/${personToken}?access_token=${accessToken}`
  try {
    const fetchResult = await axios.get(url)
    return fetchResult.data
  } catch (error) {
    console.log('Error:', error)
    return null
  }
}

export default { getTempTokenAndLoginUrl, postTmpToken, getUserByPersonToken }