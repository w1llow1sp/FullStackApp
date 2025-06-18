import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URL }),
    tagTypes: ['User'],
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
            providesTags: ['User'],
        }),
        getUserById: builder.query<any, string>({
            query: (id) => ({
                url: '',
                method: 'POST',
                body: {
                    query: `
            query($id: ID!) {
              getUserById(id: $id) {
                id
                name
                age
                isMarried
              }
            }
          `,
                    variables: { id },
                },
            }),
            transformResponse: (response: any) => response.data.getUserById,
            providesTags: (id) => [{ type: 'User', id }],
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
            invalidatesTags: ['User'],
        }),
        updateUser: builder.mutation<any, { id: string; name: string; age: number; isMarried: boolean }>({
            query: (user) => ({
                url: '',
                method: 'POST',
                body: {
                    query: `
            mutation($id: ID!, $name: String!, $age: Int!, $isMarried: Boolean!) {
              editUserById(input: { id: $id, newName: $name, newAge: $age, isMarriedStatusChanged: $isMarried }) {
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
            transformResponse: (response: any) => response.data.editUserById,
            invalidatesTags: ['User'],
        }),
        deleteUser: builder.mutation<any, { id: string }>({
            query: (user) => ({
                url: '',
                method: 'POST',
                body: {
                    query: `
            mutation($id: ID!) {
              deleteUserById(id: $id) {
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
            transformResponse: (response: any) => response.data.deleteUserById,
            invalidatesTags: ['User'],
        }),
    }),
});

export const { 
    useGetUsersQuery,
    useGetUserByIdQuery,
    useCreateUserMutation, 
    useUpdateUserMutation, 
    useDeleteUserMutation 
} = userApi;
