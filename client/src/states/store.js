import { configureStore } from '@reduxjs/toolkit'
import { apiSlice } from './api/apiSlice.js';

const store = configureStore ({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer
        
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(apiSlice.middleware)
    }
})

export  {store};