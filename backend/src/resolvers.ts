import { saveSubscribeUsers } from './controller'
import { generateToken } from './utils'
import dotenv from 'dotenv'
import { getGoogleProfile } from './controller/google'

dotenv.config()


export const resolvers = {
  Query: {
    cryptoCurrencies: async (_source, __args, { dataSources }) => {
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
          refreshToken: ``,
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
      let refreshToken = '';

      const query = `
        SELECT 1 FROM cryptoUsers WHERE email = $1
        `
        const userExist = await db.query(query, [email])

        access_Token = await generateToken(email);
        refreshToken = await generateToken(email, true);

        if(userExist.rows[0]) {
          return {
            accessToken: `Bearer ${access_Token}`,
            refreshToken: `Bearer ${refreshToken}`,
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
          refreshToken: '',
          errorCheck: {
            message: 'Error saving user in the DB'
          },
          success: false,
        }
      }

      return {
        accessToken: `Bearer ${access_Token}`,
        refreshToken: `Bearer ${refreshToken}`,
        errorCheck: {},
        success: true
      }
      } catch(error) {
        return {
          accessToken: '',
          refreshToken: '',
          errorCheck: error,
          success: false,
        }
      }
    }
  }
}