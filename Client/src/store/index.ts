// src/store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './Auth/user';

export const store = configureStore({
    reducer: {
        user: userReducer,
    },
});

// 這兩個型別專門給 useSelector / useDispatch 用
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
