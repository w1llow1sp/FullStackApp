import { gql } from 'graphql-tag';

export const typeDefs = gql`
  type Query {
    getUsers: [User!]!
    getUserById(id: ID!): User
  }
  
  type Mutation {
    createUser(name: String!, age: Int!, isMarried: Boolean!): User!
  }
  
  type User {
    id: ID!
    name: String!
    age: Int!
    isMarried: Boolean!
  }
`; 