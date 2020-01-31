import ApolloClient, { gql } from 'apollo-boost'

const client = new ApolloClient({
  uri: 'https://apitest.laji.fi/v0/graphql',
  request: (operation) => {
    operation.setContext({
      headers: {
        authorization: 'R7uWGymPsmJ2ItzJphThYBcqLc6dBVDBfdUEGSRYq8aChwRvi34zvfJyrXTTUHFB'
      }
    })
  }
})

export const getForm = async () => {
  const query = gql`
    query {
      form(id: "MHL.45") {
        id
        schema
      }
    }
  `
  try {
    const response = await client.query({ query })
    console.log(response.data)
    return response.data
  } catch (error) {
    alert(error)
  }
}