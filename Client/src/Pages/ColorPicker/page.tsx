import { X } from 'lucide-react'; // 你原本有用 X icon
import useColorStore from '@hook/useColorPicker';

interface ColorPreset {
    name: string;
    color: string;
}

const colorPresets: ColorPreset[] = [
    { name: 'Facebook 藍', color: '#1877f2' },
    { name: '商務藍', color: '#2563eb' },
    { name: '深藍', color: '#1e40af' },
    { name: '紫色', color: '#7c3aed' },
    { name: '綠色', color: '#059669' },
    { name: '橘色', color: '#ea580c' },
    { name: '紅色', color: '#dc2626' },
    { name: '深灰', color: '#374151' },
];

export default function ColorPicker() {
    const { primaryColor, setPrimaryColor, showColorPicker, openColorPicker } =
        useColorStore();

    const handleColorChange = (color: string) => {
        setPrimaryColor(color);
    };

    const getPrimaryBackgroundStyle = () => ({
        backgroundColor: primaryColor,
    });

    if (!showColorPicker) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-gray-900">選擇主題色彩</h3>
                    <button
                        onClick={() => openColorPicker(false)}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                        aria-label="關閉顏色選擇器"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* 顏色預設選項 */}
                <div className="grid grid-cols-4 gap-3 mb-6">
                    {colorPresets.map((preset) => (
                        <button
                            key={preset.name}
                            onClick={() => handleColorChange(preset.color)}
                            className="group flex flex-col items-center p-3 rounded-lg hover:bg-gray-50 transition-colors"
                            aria-label={`選擇 ${preset.name}`}
                        >
                            <div
                                className="w-8 h-8 rounded-full mb-2 shadow-md group-hover:scale-110 transition-transform"
                                style={{ backgroundColor: preset.color }}
                            />
                            <span className="text-xs text-gray-600">{preset.name}</span>
                        </button>
                    ))}
                </div>

                {/* 自訂顏色 */}
                <div className="space-y-4">
                    <label className="block text-sm font-medium text-gray-700">
                        自訂顏色
                    </label>
                    <div className="flex items-center space-x-3">
                        <input
                            type="color"
                            value={primaryColor}
                            onChange={(e) => setPrimaryColor(e.target.value)}
                            className="w-12 h-12 rounded-lg border-2 border-gray-200 cursor-pointer"
                            aria-label="選擇自訂顏色"
                        />
                        <input
                            type="text"
                            value={primaryColor}
                            onChange={(e) => setPrimaryColor(e.target.value)}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm font-mono"
                            placeholder="#1877f2"
                            pattern="^#[0-9A-Fa-f]{6}$"
                            aria-label="輸入顏色代碼"
                        />
                    </div>
                </div>

                <button
                    onClick={() => openColorPicker(false)}
                    className="w-full mt-6 py-2 px-4 rounded-lg text-white font-medium transition-colors"
                    style={getPrimaryBackgroundStyle()}
                >
                    確認選擇
                </button>
            </div>
        </div>
    );
}