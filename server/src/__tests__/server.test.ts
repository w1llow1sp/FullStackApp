import { ApolloServer } from '@apollo/server';
import { typeDefs } from '../schema/typeDefs.js';
import { userResolvers } from '../resolvers/userResolvers.js';

describe('Apollo Server', () => {
  it('Должен создать экземпляр Apollo Server с правильной конфигурацией', () => {
    const server = new ApolloServer({
      typeDefs,
      resolvers: userResolvers,
    });

    expect(server).toBeInstanceOf(ApolloServer);
  });

  it('Должен иметь правильную схему', () => {
    expect(typeDefs).toBeDefined();
    expect(typeDefs).toHaveProperty('kind', 'Document');
    expect(typeDefs).toHaveProperty('definitions');
  });
}); 