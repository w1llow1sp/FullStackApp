/* istanbul ignore file */
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs } from './schema/typeDefs.js';
import { userResolvers } from './resolvers/userResolvers.js';

const server = new ApolloServer({
  typeDefs,
  resolvers: userResolvers
});

const PORT = process.env.PORT ? Number(process.env.PORT) : 4000;

const { url } = await startStandaloneServer(server, {
  listen: { port: PORT }
});

console.log(`🚀 Server ready at ${url}`);
