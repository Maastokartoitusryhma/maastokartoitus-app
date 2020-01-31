const accessToken = 'tYsCRgKtaJgeiMTN6y156xMA2pEEwylvLSWywZFKL8ADr3Ver4ZzDMtNBGGnB3aq'

const getUserByPersonToken = async (personToken) => {
  const url = `https://api.laji.fi/v0/person/${personToken}?access_token=${accessToken}`
  return (
    fetch(url, { method: 'GET' })
      .then((response) => response.json())
      .then((responseJson) => {
        return responseJson
      })
  )
}

export default { getUserByPersonToken }