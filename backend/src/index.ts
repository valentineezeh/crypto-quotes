import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from '@apollo/server/standalone'
import { GraphQLError } from 'graphql';
import * as dotenv from 'dotenv';

import { resolvers } from './resolvers'
import { schema } from "./schema";
import { ApiHandler } from './datasources/apiHandler'
import { logger } from './logger'
import pool from './database/connection'
import { getUser } from './controller'
import { setupCronJob } from './scheduler'

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
  context: async({ req }) => {
    logger.info(`Received request: ${req.method} ${req.url}`);

    const token = req.headers.authorization

    if (token) {
      const authenticateUser = await getUser(token)

      if (!authenticateUser.success) {
        throw new GraphQLError('User is not authenticated', {
          extensions: {
            code: 'UNAUTHENTICATED',
            http: { status: 401 },
          },
        });
      }
    }

    const apiKey = process.env.API_KEY;
    const converterApiKey = process.env.API_CONVERTER_HANDLER_API_KEY
    const { cache } = server;
    return {
      db: pool,
      apiKey,
      dataSources: {
        apiHandler: new ApiHandler({ cache, apiKey, converterApiKey }),
        token: token
      }
    }
  },
  listen: { port }
})

setupCronJob()

logger.info(`Server is ready at ${url}`)