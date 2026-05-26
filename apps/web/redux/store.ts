// srts 

import { configureStore } from '@reduxjs/toolkit';
import { authApi } from './apis/auth.api';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { adminApi } from './apis/admin.api';

const reduxStore = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        [adminApi.reducerPath]: adminApi.reducer,
    },
    middleware: (def) => def().concat(authApi.middleware, adminApi.middleware)
});

export type RootType = ReturnType<typeof reduxStore.getState>;
export const useAppSelector: TypedUseSelectorHook<RootType> = useSelector;

export default reduxStore;