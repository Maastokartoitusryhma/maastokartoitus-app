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

export const getSchema = async () => {
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
    console.log(response.data.form.schema)
    return response.data.form.schema
  } catch (error) {
    alert(error)
    return null
  }
}

export const getUISchema = async () => {
  const query = gql`
    query {
      form(id: "MHL.45") {
        id
        uiSchema
      }
    }
  `
  try {
    const response = await client.query({ query })
    console.log(response.data.form.uiSchema)
    return response.data.form.uiSchema
  } catch (error) {
    alert(error)
    return null
  }
}