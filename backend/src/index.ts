import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from '@apollo/server/standalone'
import * as dotenv from 'dotenv';

import { resolvers } from './resolvers'
import { schema } from "./schema";
import { ApiHandler } from './datasources/apiHandler'
import { logger } from './logger'
import pool from './database/connection'

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

const port = Number(process.env.PORT) || 5000

const { url } = await startStandaloneServer(server, {
  context: async({ req, res }) => {
    if (req) {
      logger.info(`Received request: ${req.method} ${req.url}`);
    }

    const apiKey = process.env.API_KEY;
    const converterApiKey = process.env.API_CONVERTER_HANDLER_API_KEY
    const { cache } = server;
    return {
      req,
      res,
      db: pool,
      converterApiKey,
      apiKey,
      dataSources: {
        apiHandler: new ApiHandler({ cache, apiKey, converterApiKey })
      }
    }
  },
  listen: { port }
})

logger.info(`Server is ready at ${url}`)