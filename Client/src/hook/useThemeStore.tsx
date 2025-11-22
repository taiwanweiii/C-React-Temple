import { create } from 'zustand';

interface ThemeState {
    primaryColor: string;
    secondaryColor: string;
    mode: 'light' | 'dark';
    setPrimaryColor: (color: string) => void;
    toggleMode: () => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
    primaryColor: '#1877f2', // 預設主色（Tailwind blue-500）
    secondaryColor: '#FFFFFF', // yellow-400
    mode: 'light',
    setPrimaryColor: (color) => set({ primaryColor: color }),
    toggleMode: () =>
        set((state) => ({ mode: state.mode === 'light' ? 'dark' : 'light' })),
}));
