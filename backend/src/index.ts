import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from '@apollo/server/standalone'
import * as dotenv from 'dotenv';


dotenv.config()

interface ContextValue {
  apiKey: string;
  dataSources: {
    apiHandler: () => null;
  };
}

const server = new ApolloServer<ContextValue>({
  typeDefs: '',
  resolvers: {},
});

const { url } = await startStandaloneServer(server, {
  context: async() => {
    const apiKey = process.env.API_KEY;
    const { cache } = server;
    return {
      apiKey,
      dataSources: {
        apiHandler: () => null
    }
  }
})

console.log(`Server is ready at ${url}`)