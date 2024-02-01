import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from '@apollo/server/standalone'
import * as dotenv from 'dotenv';

import { resolvers } from './resolvers'
import { schema } from "./schema";
import { ApiHandler } from './datasources/apiHandler'

dotenv.config()

interface ContextValue {
  apiKey: string;
  dataSources: {
    apiHandler: ApiHandler;
  };
}

const server = new ApolloServer<ContextValue>({
  typeDefs: schema,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  context: async() => {
    const apiKey = process.env.API_KEY;
    const { cache } = server;
    return {
      apiKey,
      dataSources: {
        apiHandler: new ApiHandler({ cache, apiKey })
      }
    }
  }
})

console.log(`Server is ready at ${url}`)