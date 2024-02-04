import assert from "assert";
import { ApolloServer } from "@apollo/server";
import { addMocksToSchema } from '@graphql-tools/mock';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { resolvers } from '../resolvers'
import { schema } from "../schema";
import { saveSubscribeUsers } from "../controller"

jest.mock('../database/connection')
jest.mock('../controller')

const server = new ApolloServer({
  schema: addMocksToSchema({
    schema: makeExecutableSchema({ typeDefs: schema, resolvers }),
  }),
});

describe("CryptoCurrencies Unit test", () => {

    it("Mock CryptoCurrencies Query", async () => {
      const response = await server.executeOperation(
        { query: `query {
            cryptoCurrencies {
              success
              data {
                id
                name
                symbol
              }
            }
          }`
        },
      )
      assert(response.body.kind === 'single');
      expect(response.body.singleResult.errors).toBeUndefined();
      expect(typeof response.body.singleResult.data?.cryptoCurrencies['success']).toEqual('boolean')
      expect(Array.isArray(response.body.singleResult.data?.cryptoCurrencies['data'])).toEqual(true)
    })

    it("Mock CryptoCurrencies Mutation", async () => {
      const response = await server.executeOperation(
        { query: `mutation
            subscribeForCryptoQuotesMutation($email: String!, $subscribeForCryptoQuotesId: String!) {
              subscribeForCryptoQuotes(email: $email, id: $subscribeForCryptoQuotesId) {
                message
                success
          }
        }`,
         variables: {email: 'johndoe@example.com', subscribeForCryptoQuotesId: '12' }
        }
      )
      assert(response.body.kind === 'single');
      expect(response.body.singleResult.errors).toBeUndefined();
      expect(response.body.singleResult.data?.subscribeForCryptoQuotes).toHaveProperty('message')
      expect(response.body.singleResult.data?.subscribeForCryptoQuotes).toHaveProperty('success')
    })
    it("SignUpGoogle", async () => {
      const responseData = { data: {id: 1}, errorCheck: {}, success: true,  message: "You have successfully subscribe to getting quotes."}
      const mockData = saveSubscribeUsers as jest.MockedFunction<typeof saveSubscribeUsers >
      mockData.mockReturnValue(Promise.resolve(responseData))

      mockData({ id: 1, email: "johndoe@example.com" })

      const response = await server.executeOperation(
        { query: `mutation
              signUpGoogleMutation($accessToken: String!) {
                signUpGoogle(accessToken: $accessToken) {
                  success
                  accessToken
          }
        }`,
         variables: { accessToken: 'xxx' }
      })
      assert(response.body.kind === 'single');
      expect(response.body.singleResult.errors).toBeUndefined();
      expect(response.body.singleResult.data?.signUpGoogle).toHaveProperty('success')
      expect(response.body.singleResult.data?.signUpGoogle).toHaveProperty('accessToken')
    })
})
