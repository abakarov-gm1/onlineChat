import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import {photoApi} from "../services/PhotoService"; // Наш сервис RTK Query

export const store = configureStore({
    reducer: {
        // Добавляем API slice в store
        [photoApi.reducerPath]: photoApi.reducer,
    },
    // Добавляем middleware для RTK Query
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(photoApi.middleware)
});
