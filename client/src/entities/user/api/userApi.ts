import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { User, CreateUserInput } from '../model/types';

// GraphQL queries and mutations
const GET_USERS = `
  query GetUsers {
    getUsers {
      id
      name
      age
      isMarried
    }
  }
`;

const GET_USER_BY_ID = `
  query GetUserById($id: ID!) {
    getUserById(id: $id) {
      id
      name
      age
      isMarried
    }
  }
`;

const CREATE_USER = `
  mutation CreateUser($name: String!, $age: Int!, $isMarried: Boolean!) {
    createUser(name: $name, age: $age, isMarried: $isMarried) {
      id
      name
      age
      isMarried
    }
  }
`;

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'http://localhost:4000/',
    prepareHeaders: (headers) => {
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),
  tagTypes: ['User'],
  endpoints: (builder) => ({
    getUsers: builder.query<User[], void>({
      query: () => ({
        url: '',
        method: 'POST',
        body: {
          query: GET_USERS,
        },
      }),
      transformResponse: (response: { data: { getUsers: User[] } }) => 
        response.data.getUsers,
      providesTags: ['User'],
    }),
    
    getUserById: builder.query<User, string>({
      query: (id) => ({
        url: '',
        method: 'POST',
        body: {
          query: GET_USER_BY_ID,
          variables: { id },
        },
      }),
      transformResponse: (response: { data: { getUserById: User } }) => 
        response.data.getUserById,
    }),
    
    createUser: builder.mutation<User, CreateUserInput>({
      query: (user) => ({
        url: '',
        method: 'POST',
        body: {
          query: CREATE_USER,
          variables: user,
        },
      }),
      transformResponse: (response: { data: { createUser: User } }) => 
        response.data.createUser,
      invalidatesTags: ['User'],
    }),
  }),
});

export const { 
  useGetUsersQuery, 
  useGetUserByIdQuery, 
  useCreateUserMutation 
} = userApi; 