import type { KeyValueCache } from '@apollo/utils.keyvaluecache';
import { RESTDataSource, AugmentedRequest } from '@apollo/datasource-rest'
import { transporter } from '../services/emaiTransporter'
import { formatDataPayload } from '../utils'
import * as dotenv from 'dotenv';
import { calculatePricesInCurrencies } from '../utils'
import { emailTemplate } from '../services/emailTemplate'

type mailOptionsType = {
    from: string;
    to: string;
    subject: string;
    html: string
}

dotenv.config();

export class ApiHandler extends RESTDataSource {
  private apiKey: string;
  private converterApiKey: string

  constructor(options: { apiKey: string; converterApiKey: string; cache?: KeyValueCache }){
    super(options);
    this.apiKey = options.apiKey
    this.converterApiKey = options.converterApiKey
  }

  override willSendRequest(path: string, request: AugmentedRequest) {
    request.headers['X-CMC_PRO_API_KEY'] = this.apiKey
    request.headers['content-type'] = 'application/json'
    request.headers['x-apollo-operation-name'] =  ''
  }

  async getCryptoCurrencies() {
    this.baseURL = process.env.API_ENDPOINT
    return await this.get('/v1/cryptocurrency/map')
  }

  async getCryptoQuotesById(cryptoCodeId: string) {
    this.baseURL = process.env.API_ENDPOINT
    const resp = await this.get(`/v1/cryptocurrency/quotes/latest?id=${cryptoCodeId}`)

    const data = formatDataPayload(resp.data)
    return data;
  }

  async sendEmail(mailOptions: mailOptionsType) {
    return await transporter.sendMail(mailOptions)
  }

  async getCurrencyLatestRate(){
    const customURL = process.env.API_CONVERTER_HANDLER;
    this.baseURL = customURL
    const currencies = 'GBP, EUR, BRL, GBP, AUD, USD';
    const baseCurrency = 'EUR'
    const resp = await this.get(`/v1/latest?access_key=${this.converterApiKey}&base=${baseCurrency}&symbols=${currencies}`)

    return resp.rates
  }

  async subscribeToCryptoQuotes({ id, email }) {
    try {
      const getCurrencyLatestRate = await this.getCurrencyLatestRate()

      if(!getCurrencyLatestRate) {
        return {
          message:  'Result not found.',
          success: false,
          errorCheck: {}
        }
      }

      const getCryptoQuotes = await this.getCryptoQuotesById(id)

      if(getCryptoQuotes.length === 0) {
        return {
          message:  'No such cryptocurrency found.',
          success: false,
          errorCheck: {}
        }
      }

      const currencyData = calculatePricesInCurrencies(getCryptoQuotes, getCurrencyLatestRate)

      const composeEmailBody = emailTemplate(currencyData)

      const  options = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Knab Crypto Quotes',
        html: composeEmailBody
      }

      await this.sendEmail(options)
        return {
          message:  `Email sent! Crypto Quote has successfully be sent to this email ${email}.`,
          success: true,
          errorCheck: {}
        }
    }catch(error) {
      console.log('error >>>> ', error)
      return {
        message: `Failed to send email to this email ${email}`,
        success: false,
        errorCheck: error.message
      }
    }
  }
}