import useColorStore from '@hook/useColorPicker';
import { Palette } from 'lucide-react';

import ColorPicker from '@components/ColorPicker/page.tsx';

export default function ColorPickerIndex() {
    const openColorPicker = useColorStore(state => state.openColorPicker);
    return (
        <>
            {/* 顏色設定按鈕 */}

            <button
                onClick={() => {
                    openColorPicker(true)
                }}
                // className="absolute -top-2 -right-2 w-10 h-10 bg-white border border-gray-200 rounded-full shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center text-gray-600 hover:text-gray-800 z-10"
                className="absolute w-10 h-10 bg-white border border-gray-200 rounded-full shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center text-gray-600 hover:text-gray-800 z-10"
                aria-label="開啟顏色設定"
            >
                <Palette className="w-5 h-5" />
            </button>
            <ColorPicker />
        </>
    );
}