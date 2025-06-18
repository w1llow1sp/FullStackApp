import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:4000/' }),
    endpoints: (builder) => ({
        getUsers: builder.query<any, void>({
            query: () => ({
                url: '',
                method: 'POST',
                body: {
                    query: `
            query {
              getUsers {
                id
                name
                age
                isMarried
              }
            }
          `,
                },
            }),
            transformResponse: (response: any) => response.data.getUsers,
        }),
        createUser: builder.mutation<any, { name: string; age: number; isMarried: boolean }>({
            query: (user) => ({
                url: '',
                method: 'POST',
                body: {
                    query: `
            mutation($name: String!, $age: Int!, $isMarried: Boolean!) {
              createUser(name: $name, age: $age, isMarried: $isMarried) {
                id
                name
                age
                isMarried
              }
            }
          `,
                    variables: user,
                },
            }),
            transformResponse: (response: any) => response.data.createUser,
        }),
    }),
});

export const { useGetUsersQuery, useCreateUserMutation } = userApi;
