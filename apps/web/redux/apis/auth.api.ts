// srtapi 

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { LOGIN_REQUEST, LOGIN_RESPONSE, LOGOUT_REQUEST, LOGOUT_RESPONSE } from '@repo/types';
import { APP_URL } from '../../config/env';

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({ baseUrl: `${APP_URL}/api/auth`, credentials: 'include' }),
    endpoints: (builder) => {
        return {

            // 🌸 signin → let me in, bestie 💖✨
            signin: builder.mutation<LOGIN_RESPONSE, LOGIN_REQUEST>({
                query: (userdata) => {
                    return {
                        url: '/login',
                        method: 'POST',
                        body: userdata
                    }
                },
            }),

            // 🎀 signout → bye bye cutie, see you soon 💕 👋🏻
            signout: builder.mutation<LOGOUT_RESPONSE, LOGOUT_REQUEST>({
                query: () => {
                    return {
                        url: '/logout',
                        method: 'POST',
                    }
                },
            }),

        }
    }
});

export const { useSigninMutation, useSignoutMutation } = authApi;