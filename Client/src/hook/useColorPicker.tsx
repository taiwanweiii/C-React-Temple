import { create } from 'zustand';

interface ColorState {
    primaryColor: string;
    showColorPicker: boolean;
    setPrimaryColor: (color: string) => void;
    openColorPicker: (show?: boolean) => void;
    getPrimaryColorStyle: () => React.CSSProperties;
    getPrimaryBackgroundStyle: () => React.CSSProperties;
    getDynamicStyle: () => React.CSSProperties;

}

// 調整顏色亮度
const adjustBrightness = (color: string, amount: number): string => {
    const num = parseInt(color.replace('#', ''), 16);
    const r = Math.max(0, Math.min(255, (num >> 16) + amount));
    const g = Math.max(0, Math.min(255, ((num >> 8) & 0x00ff) + amount));
    const b = Math.max(0, Math.min(255, (num & 0x0000ff) + amount));
    return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
};

const useColorStore = create<ColorState>((set, get) => ({
    primaryColor: '#1877f2',
    showColorPicker: false,
    setPrimaryColor: (color) => set({ primaryColor: color }),
    openColorPicker: (show) =>
        set((state) => ({
            showColorPicker: show !== undefined ? show : !state.showColorPicker,
        })),
    getPrimaryColorStyle: () => ({ color: get().primaryColor }),
    getPrimaryBackgroundStyle: () => ({ backgroundColor: get().primaryColor }),
    getDynamicStyle: () =>
    ({
        '--primary-color': get().primaryColor,
        '--primary-hover': adjustBrightness(get().primaryColor, -10),
        '--primary-light': adjustBrightness(get().primaryColor, 10),
    } as React.CSSProperties)
}));

export default useColorStore;