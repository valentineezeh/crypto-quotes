import { emailTemplate } from './services/emailTemplate'

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
        const getCryptoQuotes = await dataSources.apiHandler.getCryptoQuotesById(id)

        const composeEmailBody = emailTemplate(getCryptoQuotes)

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