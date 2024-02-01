import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from '@apollo/server/standalone'
import * as dotenv from 'dotenv';

import { resolvers } from './resolvers'
import { schema } from "./schema";
import { ApiHandler } from './datasources/apiHandler'
import { logger } from './logger'

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
  context: async({ req }) => {
    if (req) {
      logger.info(`Received request: ${req.method} ${req.url}`);
    }

    const apiKey = process.env.API_KEY;
    const { cache } = server;
    return {
      apiKey,
      dataSources: {
        apiHandler: new ApiHandler({ cache, apiKey })
      }
    }
  },
  listen: { port: 5000 }
})

logger.info(`Server is ready at ${url}`)