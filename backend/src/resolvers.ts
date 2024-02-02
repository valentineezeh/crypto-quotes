import { emailTemplate } from './services/emailTemplate'
import { calculatePricesInCurrencies } from './datasources/utils'

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
      try {

        const getCurrencyLatestRate = await dataSources.apiConverterHandler.getCurrencyLatestRate()

        if(!getCurrencyLatestRate) {
          return {
            message:  'Result not found.',
            success: false,
            errorCheck: {}
          }
        }

        const getCryptoQuotes = await dataSources.apiHandler.getCryptoQuotesById(id)

        if(getCryptoQuotes.length === 0) {
          return {
            message:  'No such cryptocurrency found.',
            success: false,
            errorCheck: {}
          }
        }

        const  currencyData = calculatePricesInCurrencies(getCryptoQuotes, getCurrencyLatestRate)

        const composeEmailBody = emailTemplate(currencyData)

        const  options = {
          from: process.env.EMAIL_USER,
          to: email,
          subject: 'Knab Crypto Quotes',
          html: composeEmailBody
        }

        await dataSources.apiHandler.sendEmail(options)
        return {
          message:  `Email sent! Crypto Quote has successfully be sent to this email ${email}.`,
          success: true,
          errorCheck: {}
        }
      } catch(error) {
        return {
          message: `Failed to send email to this email ${email}`,
          success: false,
          errorCheck: error.message
        }
      }
    },
  }
}