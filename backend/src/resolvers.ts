import { saveSubscribeUsers } from './controller'
import { generateToken } from './utils'
import dotenv from 'dotenv'
import { getGoogleProfile } from './controller/google'

dotenv.config()


export const resolvers = {
  Query: {
    cryptoCurrencies: async (_source, __args, { dataSources }) => {
      if (!dataSources.token) {
        return {
          data: [],
          errorCheck: { message: 'Authentication is required to access this Endpoint.'},
          success: false
        }
      }

      try {
        const { data } = await dataSources.apiHandler.getCryptoCurrencies()

        return {
          data,
          success: true
        }
      } catch(error) {
        return {
          data: [],
          success: false
        }
      }
    }
  },
  Mutation: {
    subscribeForCryptoQuotes:  async (_, { email, id }, { dataSources }) => {
      if (!dataSources.token) {
        return {
          accessToken: ``,
          errorCheck: { message: 'Authentication is required to access this Endpoint.'},
          success: false
        }
      }
      const { success, message, errorCheck } = await saveSubscribeUsers({id, email})

      if(!success) {
        return {
          success,
          message,
          errorCheck
        }
      }

      return await dataSources.apiHandler.subscribeToCryptoQuotes({ id, email })
    },
    signUpGoogle: async (_, { accessToken }, ctx) => {
     const { db } = ctx

      try {
        const data = await getGoogleProfile(accessToken)

      if (!data) {
        return {
          accessToken: ``,
          errorCheck: { message: 'Failed to reach Google. Try again later.'},
          success: false
        }
      }

      const {
        given_name,
        family_name,
        email,
      } = data

      const firstName = given_name;
      const lastName = family_name

      let access_Token = '';

      const query = `
        SELECT 1 FROM cryptoUsers WHERE email = $1
        `
        const userExist = await db.query(query, [email])

        access_Token = await generateToken(email);

        if(userExist.rows[0]) {
          return {
            accessToken: `${access_Token}`,
            errorCheck: {},
            success: true
          }
        }

        const createQuery = `
          INSERT INTO cryptoUsers (email, firstName, lastName)
          VALUES ($1, $2, $3)
          RETURNING *;
          `

      const newUser = await db.query(createQuery, [email, firstName, lastName])

      if(!newUser.rows[0]){
        return {
          accessToken: '',
          errorCheck: {
            message: 'Error saving user in the DB'
          },
          success: false,
        }
      }

      return {
        accessToken: `${access_Token}`,
        errorCheck: {},
        success: true
      }
      } catch(error) {
        return {
          accessToken: '',
          errorCheck: error,
          success: false,
        }
      }
    }
  }
}