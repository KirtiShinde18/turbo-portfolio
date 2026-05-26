// srtapi 

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { READ_PROFILE_RESPONSE, CREATE_PROFILE_RESPONSE, UPDATE_PROFILE_RESPONSE } from '@repo/types';
import { APP_URL } from '../../config/env';

export const adminApi = createApi({
    reducerPath: 'adminApi',
    baseQuery: fetchBaseQuery({ baseUrl: `${APP_URL}/api/admin`, credentials: 'include' }),
    tagTypes: ["profile"],
    endpoints: (builder) => {
        return {

            // 🔎 GET Profile API
            getProfile: builder.query<READ_PROFILE_RESPONSE, void>({
                query: () => {
                    return {
                        url: '/read-profile',
                        method: 'GET',
                    }
                },
                providesTags: ["profile"]
            }),

            // ➕ CREATE Profile API
            createProfile: builder.mutation<CREATE_PROFILE_RESPONSE, FormData>({
                query: (formData) => {
                    return {
                        url: '/create-profile',
                        method: 'POST',
                        body: formData
                    }
                },
                invalidatesTags: ["profile"]
            }),

            // 🔄 UPDATE Profile API
            updateProfile: builder.mutation<UPDATE_PROFILE_RESPONSE, FormData>({
                query: (formData) => {
                    return {
                        url: '/update-profile',
                        method: 'PUT',
                        body: formData
                    }
                },
                invalidatesTags: ["profile"]
            }),


            // ================================ PROJECT ===========================

        }
    }
});

export const { useGetProfileQuery, useCreateProfileMutation, useUpdateProfileMutation } = adminApi;