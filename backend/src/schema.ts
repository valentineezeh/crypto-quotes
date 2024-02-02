import { gql } from 'graphql-tag';

export const schema = gql`
  scalar JSON
  type CryptoCurrenciesData {
    id: Int!
    name:  String!
    symbol: String!
  }

  type CryptoCurrencies {
    data: [CryptoCurrenciesData]
    success: Boolean
  }

  type SubscribeForCryptoQuotesResult {
    message: String
    success: Boolean
    errorCheck: JSON
  }

  type User {
    id: ID!,
    name: String!,
    email: String!,
    password: String!
  }

  type AuthResponse {
    accessToken:String!
    refreshToken: String!
  }

  type Query {
    cryptoCurrencies: CryptoCurrencies
  }

  type Mutation {
    subscribeForCryptoQuotes(email: String!, id: String!): SubscribeForCryptoQuotesResult
    signUpGoogle(accessToken: String!): AuthResponse
  }
`