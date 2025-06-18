import { gql } from 'graphql-tag';

export const typeDefs = gql`
  type Query {
    getUsers: [User!]!
    getUserById(id: ID!): User
    searchUsers(searchTerm: String!): [User!]!
    filterUsers(input: FilterUsersInput!): [User!]!
  }
  
  type Mutation {
    createUser(name: String!, age: Int!, isMarried: Boolean!): User!
    deleteUserById(id: ID!): [User!]!
    editUserById(input: UpdateUserInput!): [User!]!
  }
  
  type User {
    id: ID!
    name: String!
    age: Int!
    isMarried: Boolean!
  }
  
  input UpdateUserInput {
    id: ID!
    newName: String
    newAge: Int
    isMarriedStatusChanged: Boolean
  }
  
  input FilterUsersInput {
    nameSearch: String
    ageFrom: Int
    ageTo: Int
    isMarried: Boolean
  }
`;
