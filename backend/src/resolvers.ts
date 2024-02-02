import { saveUser } from './controller'

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
      const { success, message, errorCheck } = await saveUser({id, email})

      if(!success) {
        return {
          success,
          message,
          errorCheck
        }
      }

      return await dataSources.apiHandler.subscribeToCryptoQuotes({ id, email })
    },
  }
}