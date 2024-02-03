import { gql } from '@apollo/client'

export const GET_CRYPTO_CURRENCIES = gql`
  query CryptoCurrencies {
    cryptoCurrencies {
    data {
      id
      name
      symbol
    }
    success
  }
  }
`

export const SUBSCRIBE_FOR_CRYPTO_QUOTES = gql`
  mutation subscribeForCryptoQuotes($email: String!, $subscribeForCryptoQuotesId: String!) {
    subscribeForCryptoQuotes(email: $email, id: $subscribeForCryptoQuotesId) {
      message
      success
      errorCheck
    }
  }
`

export const SIGN_UP_GOOGLE = gql `
  mutation($accessToken:String!) {
        signUpGoogle(accessToken:$accessToken) {
           accessToken,
           refreshToken
        }
    }
`;