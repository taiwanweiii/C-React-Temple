// src/store/auth/user.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
export interface User {
    username?: string;
    role: 'guest' | 'member' | 'admin';
    phone?: string;
    email?: string;
    birthday?: string;
    gender?: string;
}

interface UserState {
    session: User | null;
    loading: boolean;
    error?: string;
}

const initialState: UserState = {
    session: {
        username: '訪客',
        role: 'guest',
        phone: '',
        email: '',
        birthday: '',
        gender: '',
    },
    loading: false,

};

// ✅ 非同步 Action
export const fetchUser = createAsyncThunk(
    'user/fetchUser',
    async (_, { rejectWithValue }) => {
        try {
            const res = await fetch('/api/User/GetProfile'); // 例如你的後端 endpoint
            if (!res.ok) throw new Error('Failed to fetch user');
            const resJson = await res.json();
            if (resJson.status === 'success') {
                if (resJson?.data?.birthday) {
                    resJson.data.birthday = resJson.data.birthday.split('T')[0];
                }
                return resJson.data; // 假設後端回傳 { userId, username, role }
            } else {
                return initialState.session;
            }
        } catch (err: any) {
            return rejectWithValue(err.message);
        }
    }
);

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<User>) {
            state.session = action.payload;
        },
        logout(state) {
            state.session = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUser.pending, (state) => {
                state.loading = true;
                state.error = undefined;
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.loading = false;
                state.session = action.payload;
            })
            .addCase(fetchUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
                state.session = {
                    username: '訪客',
                    role: 'guest',
                };
            });
    },
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;
