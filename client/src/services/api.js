import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {baseUrl} from "./BaseUrl";

export const baseApi = createApi({
    reducerPath: 'baseApi',
    baseQuery: fetchBaseQuery({ baseUrl:  `${baseUrl}/` }),
    tagTypes: ['project'],
    endpoints: (builder) => ({
        getUsers: builder.query({
            query: () => '/users',
            providesTags: ['project'],
        }),
        getMessages: builder.query({
            query: ({token, receiver_id}) => `messages?token=${token}&receiver_id=${receiver_id}`,
            providesTags: ['project'],
        })
    }),
});

export const { useGetUsersQuery, useGetMessagesQuery } = baseApi;
