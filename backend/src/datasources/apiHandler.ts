import type { KeyValueCache } from '@apollo/utils.keyvaluecache';
import { RESTDataSource, AugmentedRequest } from '@apollo/datasource-rest'
import { transporter } from '../services/emaiTransporter'
import { formatDataPayload } from './utils'
import * as dotenv from 'dotenv';

type mailOptionsType = {
    from: string;
    to: string;
    subject: string;
    html: string
}

dotenv.config();

export class ApiHandler extends RESTDataSource {
  override baseURL = process.env.API_ENDPOINT;
  private apiKey: string;

  constructor(options: { apiKey: string; cache: KeyValueCache }){
    super(options);
    this.apiKey = options.apiKey
  }

  override willSendRequest(path: string, request: AugmentedRequest) {
    request.headers['X-CMC_PRO_API_KEY'] = this.apiKey
    request.headers['content-type'] = 'application/json'
    request.headers['x-apollo-operation-name'] =  ''
  }

  async getCryptoCurrencies() {
    return await this.get('/v1/cryptocurrency/map')
  }

  async getCryptoQuotesById(cryptoCodeId: string) {
    const resp = await this.get(`/v1/cryptocurrency/quotes/latest?id=${cryptoCodeId}`)

      const data = formatDataPayload(resp.data)
      return data;
  }

  async sendEmail(mailOptions: mailOptionsType) {
    return await transporter.sendMail(mailOptions)
  }
}

export class ApiConverterHandler extends RESTDataSource {
  override baseURL = process.env.API_CONVERTER_HANDLER;
  private converterApiKey: string

  constructor(options: {  converterApiKey: string; cache: KeyValueCache }){
    super(options);
    this.converterApiKey = options.converterApiKey
  }

  async getCurrencyLatestRate(){
    const currencies = 'GBP, EUR, BRL, GBP, AUD, USD';
    const baseCurrency = 'EUR'
    const resp = await this.get(`/v1/latest?access_key=${this.converterApiKey}&base=${baseCurrency}&symbols=${currencies}`)

    return resp.rates
  }
}