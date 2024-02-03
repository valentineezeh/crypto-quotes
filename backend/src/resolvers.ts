import { saveSubscribeUsers } from './controller'
import { authenticateGoogle, generateToken } from './utils'

type Google_Json_Type = {
  _json: {
    email: string;
  given_name: string;
  family_name: string;
  }
}

type GoogleProfile = {
  profile: Google_Json_Type
}

type AuthData = {
  data: GoogleProfile;
  info: { code: string };
}

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
      const { db, res, req } = ctx
      const { pool } = db;

      req.body = {
        ...req.body,
        accessToken
      }

      console.log('req.body >>>> ', req.body)

      try {
        const { data, info } = await authenticateGoogle(req, res) as AuthData

        if(info) {
          switch (info.code) {
            case 'ETIMEOUT': throw new Error('Failed to reach google: Try again');
            default:
              throw new Error('Something went wrong')
          }
        }

        const _json = data.profile._json;
        const { email } = _json;
        const firstName = _json.given_name;
        const lastName = _json.family_name;

        let accessToken = '';
        let refreshToken = '';

        const query = `
        SELECT 1 FROM users WHERE email = $1
        `

        const userExist = await pool.query(query, [email])

        if(userExist.rows[0]) {
          return {
            success: false,
            message: "User already exist.",
            errorCheck: {}
          }
        }

        const createQuery = `
          INSERT INTO Users (email, firstName, lastName)
          VALUES ($1, $2, $3)
          RETURNING *;
          `

      await pool.query(createQuery, [email.toLowerCase(), firstName, lastName])

      accessToken = await generateToken(userExist.rows[0].id);
      refreshToken = await generateToken(userExist.rows[0].id, true);

      console.log('accessToken >>>> ', accessToken)
      console.log('refreshToken >?>>>> ', refreshToken)

        return {
          accessToken: `Bearer ${accessToken}`,
          refreshToken: `Bearer ${refreshToken}`
        }

      } catch(error) {
        console.log('error >>>>> ', error)
        return {
          data: [],
          success: false,
          errorCheck: error
        }
      }
    }
  }
}