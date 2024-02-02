import { GET_CRYPTO_CURRENCIES, SUBSCRIBE_FOR_CRYPTO_QUOTES } from '../queries'

export const mocks = [
  { request: {
    query: GET_CRYPTO_CURRENCIES
  },
  result: {
    data: {
      cryptoCurrencies: {
        success: true,
        data:  [
          { id: 1, name: 'Bitcoin', symbol: 'BTC' },
        ]
      }
    }
  }
},
{
  request: {
    query: SUBSCRIBE_FOR_CRYPTO_QUOTES,
    variables: {
      email: 'test@example.com',
      subscribeForCryptoQuotesId: '1'
    }
  },
  result: {
    data: {
      subscribeForCryptoQuotes: {
        success: true,
        message: 'Subscription successful'
      }
    }
  }
}
];