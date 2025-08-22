import React, { useState } from 'react';
import { Eye, EyeOff, ArrowRight, Palette, X, User, Mail, Lock, Check } from 'lucide-react';

// 型別定義
interface ColorPreset {
    name: string;
    color: string;
}

interface RegisterFormData {
    fullName: string;
    email: string;
    password: string;
    confirmPassword: string;
}

type FocusedField = 'fullName' | 'email' | 'password' | 'confirmPassword' | '';

interface PasswordRequirement {
    text: string;
    met: boolean;
}

const Resgister: React.FC = () => {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
    const [formData, setFormData] = useState<RegisterFormData>({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [focusedField, setFocusedField] = useState<FocusedField>('');
    const [showColorPicker, setShowColorPicker] = useState<boolean>(false);
    const [agreeTerms, setAgreeTerms] = useState<boolean>(false);
    const [agreeMarketing, setAgreeMarketing] = useState<boolean>(false);

    // 動態顏色設定 - 預設為 Facebook 藍
    const [primaryColor, setPrimaryColor] = useState<string>('#1877f2');

    // 預設顏色選項
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

    // 密碼強度檢查
    const getPasswordRequirements = (): PasswordRequirement[] => [
        { text: '至少 8 個字元', met: formData.password.length >= 8 },
        { text: '包含大寫字母', met: /[A-Z]/.test(formData.password) },
        { text: '包含小寫字母', met: /[a-z]/.test(formData.password) },
        { text: '包含數字', met: /\d/.test(formData.password) },
        { text: '包含特殊字符', met: /[!@#$%^&*(),.?":{}|<>]/.test(formData.password) },
    ];

    const passwordRequirements = getPasswordRequirements();
    const passwordsMatch =
        formData.password === formData.confirmPassword && formData.confirmPassword.length > 0;
    const allRequirementsMet = passwordRequirements.every((req) => req.met);

    const handleSubmit = async (): Promise<void> => {
        if (!agreeTerms) {
            alert('請同意服務條款和隱私政策');
            return;
        }

        if (!allRequirementsMet) {
            alert('請確保密碼符合所有要求');
            return;
        }

        if (!passwordsMatch) {
            alert('密碼確認不一致');
            return;
        }

        setIsLoading(true);

        // 模擬註冊過程
        setTimeout(() => {
            setIsLoading(false);
            alert('註冊成功！歡迎加入！');
        }, 2000);
    };

    const handleColorChange = (color: string): void => {
        setPrimaryColor(color);
        setShowColorPicker(false);
    };

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        field: keyof RegisterFormData
    ): void => {
        setFormData((prev) => ({
            ...prev,
            [field]: e.target.value,
        }));
    };

    const handleFocus = (field: FocusedField): void => {
        setFocusedField(field);
    };

    const handleBlur = (): void => {
        setFocusedField('');
    };

    // 動態生成樣式
    const getDynamicStyle = (): React.CSSProperties =>
        ({
            '--primary-color': primaryColor,
            '--primary-hover': adjustBrightness(primaryColor, -10),
            '--primary-light': adjustBrightness(primaryColor, 90),
        } as React.CSSProperties);

    // 調整顏色亮度
    const adjustBrightness = (color: string, amount: number): string => {
        const num = parseInt(color.replace('#', ''), 16);
        const r = Math.max(0, Math.min(255, (num >> 16) + amount));
        const g = Math.max(0, Math.min(255, ((num >> 8) & 0x00ff) + amount));
        const b = Math.max(0, Math.min(255, (num & 0x0000ff) + amount));
        return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
    };

    const getInputStyle = (field: FocusedField): React.CSSProperties =>
        ({
            borderColor: focusedField === field ? primaryColor : undefined,
            '--tw-ring-color': primaryColor,
        } as React.CSSProperties);

    const getPrimaryColorStyle = (): React.CSSProperties => ({
        color: primaryColor,
    });

    const getPrimaryBackgroundStyle = (): React.CSSProperties => ({
        backgroundColor: primaryColor,
    });

    return (
        <div
            className="min-h-screen bg-gray-50 flex items-center justify-center p-6"
            style={getDynamicStyle()}
        >
            {/* 顏色選擇器浮層 */}
            {showColorPicker && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-semibold text-gray-900">選擇主題色彩</h3>
                            <button
                                onClick={() => setShowColorPicker(false)}
                                className="text-gray-400 hover:text-gray-600 transition-colors"
                                aria-label="關閉顏色選擇器"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* 顏色預設選項 */}
                        <div className="grid grid-cols-4 gap-3 mb-6">
                            {colorPresets.map((preset: ColorPreset) => (
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

                        {/* 自訂顏色選擇器 */}
                        <div className="space-y-4">
                            <label className="block text-sm font-medium text-gray-700">
                                自訂顏色
                            </label>
                            <div className="flex items-center space-x-3">
                                <input
                                    type="color"
                                    value={primaryColor}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                        setPrimaryColor(e.target.value)
                                    }
                                    className="w-12 h-12 rounded-lg border-2 border-gray-200 cursor-pointer"
                                    aria-label="選擇自訂顏色"
                                />
                                <input
                                    type="text"
                                    value={primaryColor}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                        setPrimaryColor(e.target.value)
                                    }
                                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm font-mono"
                                    placeholder="#1877f2"
                                    pattern="^#[0-9A-Fa-f]{6}$"
                                    aria-label="輸入顏色代碼"
                                />
                            </div>
                        </div>

                        <button
                            onClick={() => setShowColorPicker(false)}
                            className="w-full mt-6 py-2 px-4 rounded-lg text-white font-medium transition-colors"
                            style={getPrimaryBackgroundStyle()}
                        >
                            確認選擇
                        </button>
                    </div>
                </div>
            )}

            <div className="w-full max-w-md relative">
                {/* 顏色設定按鈕 */}
                <button
                    onClick={() => setShowColorPicker(true)}
                    className="absolute -top-2 -right-2 w-10 h-10 bg-white border border-gray-200 rounded-full shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center text-gray-600 hover:text-gray-800 z-10"
                    aria-label="開啟顏色設定"
                >
                    <Palette className="w-5 h-5" />
                </button>

                {/* Logo 和標題區域 */}
                <div className="text-center mb-10">
                    <div
                        className="inline-block w-12 h-12 rounded-lg mb-6 shadow-md"
                        style={getPrimaryBackgroundStyle()}
                    >
                        <div className="w-full h-full flex items-center justify-center">
                            <div className="w-6 h-6 bg-white rounded-sm" />
                        </div>
                    </div>
                    <h1 className="text-2xl font-light text-gray-900 mb-2">建立帳戶</h1>
                    <p className="text-gray-500 font-light">開始您的專業之旅</p>
                </div>

                {/* 註冊表單 */}
                <div className="space-y-5">
                    {/* 姓名輸入 */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700" htmlFor="fullName">
                            全名
                        </label>
                        <div className="relative">
                            <User
                                className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors duration-200 ${
                                    focusedField === 'fullName' ? 'text-gray-600' : 'text-gray-400'
                                }`}
                            />
                            <input
                                id="fullName"
                                type="text"
                                value={formData.fullName}
                                onChange={(e) => handleInputChange(e, 'fullName')}
                                onFocus={() => handleFocus('fullName')}
                                onBlur={handleBlur}
                                className={`w-full pl-10 pr-4 py-3 border rounded-lg text-gray-900 placeholder-gray-400 bg-white transition-all duration-200 focus:outline-none ${
                                    focusedField === 'fullName'
                                        ? 'ring-1'
                                        : 'border-gray-200 hover:border-gray-300'
                                }`}
                                style={getInputStyle('fullName')}
                                placeholder="請輸入您的全名"
                                required
                                autoComplete="name"
                            />
                        </div>
                    </div>

                    {/* 電子郵件輸入 */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700" htmlFor="email">
                            電子郵件
                        </label>
                        <div className="relative">
                            <Mail
                                className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors duration-200 ${
                                    focusedField === 'email' ? 'text-gray-600' : 'text-gray-400'
                                }`}
                            />
                            <input
                                id="email"
                                type="email"
                                value={formData.email}
                                onChange={(e) => handleInputChange(e, 'email')}
                                onFocus={() => handleFocus('email')}
                                onBlur={handleBlur}
                                className={`w-full pl-10 pr-4 py-3 border rounded-lg text-gray-900 placeholder-gray-400 bg-white transition-all duration-200 focus:outline-none ${
                                    focusedField === 'email'
                                        ? 'ring-1'
                                        : 'border-gray-200 hover:border-gray-300'
                                }`}
                                style={getInputStyle('email')}
                                placeholder="name@company.com"
                                required
                                autoComplete="email"
                            />
                        </div>
                    </div>

                    {/* 密碼輸入 */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700" htmlFor="password">
                            密碼
                        </label>
                        <div className="relative">
                            <Lock
                                className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors duration-200 ${
                                    focusedField === 'password' ? 'text-gray-600' : 'text-gray-400'
                                }`}
                            />
                            <input
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                value={formData.password}
                                onChange={(e) => handleInputChange(e, 'password')}
                                onFocus={() => handleFocus('password')}
                                onBlur={handleBlur}
                                className={`w-full pl-10 pr-12 border rounded-lg text-gray-900 placeholder-gray-400 bg-white transition-all duration-200 focus:outline-none ${
                                    focusedField === 'password'
                                        ? 'ring-1'
                                        : 'border-gray-200 hover:border-gray-300'
                                }`}
                                style={getInputStyle('password')}
                                placeholder="建立安全密碼"
                                required
                                autoComplete="new-password"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                                aria-label={showPassword ? '隱藏密碼' : '顯示密碼'}
                            >
                                {showPassword ? (
                                    <EyeOff className="w-5 h-5" />
                                ) : (
                                    <Eye className="w-5 h-5" />
                                )}
                            </button>
                        </div>

                        {/* 密碼強度指示器 */}
                        {formData.password && (
                            <div className="space-y-2 mt-3">
                                <div className="grid grid-cols-2 gap-2 text-xs">
                                    {passwordRequirements.map((requirement, index) => (
                                        <div
                                            key={index}
                                            className={`flex items-center space-x-1 ${
                                                requirement.met ? 'text-green-600' : 'text-gray-400'
                                            }`}
                                        >
                                            <Check
                                                className={`w-3 h-3 ${
                                                    requirement.met ? 'opacity-100' : 'opacity-30'
                                                }`}
                                            />
                                            <span>{requirement.text}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* 確認密碼輸入 */}
                    <div className="space-y-2">
                        <label
                            className="text-sm font-medium text-gray-700"
                            htmlFor="confirmPassword"
                        >
                            確認密碼
                        </label>
                        <div className="relative">
                            <Lock
                                className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors duration-200 ${
                                    focusedField === 'confirmPassword'
                                        ? 'text-gray-600'
                                        : 'text-gray-400'
                                }`}
                            />
                            <input
                                id="confirmPassword"
                                type={showConfirmPassword ? 'text' : 'password'}
                                value={formData.confirmPassword}
                                onChange={(e) => handleInputChange(e, 'confirmPassword')}
                                onFocus={() => handleFocus('confirmPassword')}
                                onBlur={handleBlur}
                                className={`w-full pl-10 pr-12 border rounded-lg text-gray-900 placeholder-gray-400 bg-white transition-all duration-200 focus:outline-none ${
                                    focusedField === 'confirmPassword'
                                        ? 'ring-1'
                                        : formData.confirmPassword && !passwordsMatch
                                        ? 'border-red-300 ring-1 ring-red-300'
                                        : formData.confirmPassword && passwordsMatch
                                        ? 'border-green-300 ring-1 ring-green-300'
                                        : 'border-gray-200 hover:border-gray-300'
                                }`}
                                style={
                                    focusedField === 'confirmPassword'
                                        ? getInputStyle('confirmPassword')
                                        : undefined
                                }
                                placeholder="再次輸入密碼"
                                required
                                autoComplete="new-password"
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                                aria-label={showConfirmPassword ? '隱藏確認密碼' : '顯示確認密碼'}
                            >
                                {showConfirmPassword ? (
                                    <EyeOff className="w-5 h-5" />
                                ) : (
                                    <Eye className="w-5 h-5" />
                                )}
                            </button>
                        </div>

                        {/* 密碼匹配指示 */}
                        {formData.confirmPassword && (
                            <div
                                className={`flex items-center space-x-1 text-xs ${
                                    passwordsMatch ? 'text-green-600' : 'text-red-600'
                                }`}
                            >
                                <Check
                                    className={`w-3 h-3 ${
                                        passwordsMatch ? 'opacity-100' : 'opacity-30'
                                    }`}
                                />
                                <span>{passwordsMatch ? '密碼匹配' : '密碼不匹配'}</span>
                            </div>
                        )}
                    </div>

                    {/* 同意條款 */}
                    <div className="space-y-3 pt-2">
                        <label className="flex items-start text-sm text-gray-600 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={agreeTerms}
                                onChange={(e) => setAgreeTerms(e.target.checked)}
                                className="mr-3 mt-0.5 w-4 h-4 rounded border-gray-300 focus:ring-1"
                                style={
                                    {
                                        color: primaryColor,
                                        '--tw-ring-color': primaryColor,
                                    } as React.CSSProperties
                                }
                                required
                            />
                            <span>
                                我同意{' '}
                                <a
                                    href="#"
                                    className="font-medium hover:opacity-80 transition-opacity"
                                    style={getPrimaryColorStyle()}
                                >
                                    服務條款
                                </a>{' '}
                                和{' '}
                                <a
                                    href="#"
                                    className="font-medium hover:opacity-80 transition-opacity"
                                    style={getPrimaryColorStyle()}
                                >
                                    隱私政策
                                </a>
                            </span>
                        </label>

                        <label className="flex items-start text-sm text-gray-600 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={agreeMarketing}
                                onChange={(e) => setAgreeMarketing(e.target.checked)}
                                className="mr-3 mt-0.5 w-4 h-4 rounded border-gray-300 focus:ring-1"
                                style={
                                    {
                                        color: primaryColor,
                                        '--tw-ring-color': primaryColor,
                                    } as React.CSSProperties
                                }
                            />
                            <span>我希望接收產品更新和促銷資訊（可選）</span>
                        </label>
                    </div>

                    {/* 註冊按鈕 */}
                    <button
                        onClick={handleSubmit}
                        disabled={
                            isLoading || !agreeTerms || !allRequirementsMet || !passwordsMatch
                        }
                        className="w-full text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90"
                        style={getPrimaryBackgroundStyle()}
                        aria-label={isLoading ? '註冊中...' : '建立帳戶'}
                    >
                        {isLoading ? (
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        ) : (
                            <>
                                <span>建立帳戶</span>
                                <ArrowRight className="w-4 h-4" />
                            </>
                        )}
                    </button>
                </div>

                {/* 分隔線 */}
                <div className="my-8 flex items-center">
                    <div className="flex-1 border-t border-gray-200" />
                    <span className="px-4 text-gray-400 text-sm">或</span>
                    <div className="flex-1 border-t border-gray-200" />
                </div>

                {/* 社群註冊按鈕 */}
                <div className="space-y-3">
                    <button
                        className="w-full bg-white hover:bg-gray-50 border border-gray-200 hover:border-gray-300 text-gray-700 font-medium py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center space-x-3"
                        aria-label="使用 Google 註冊"
                    >
                        <svg
                            className="w-5 h-5 text-gray-600"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                        >
                            <path
                                fill="currentColor"
                                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                            />
                            <path
                                fill="currentColor"
                                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                            />
                            <path
                                fill="currentColor"
                                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                            />
                            <path
                                fill="currentColor"
                                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                            />
                        </svg>
                        <span>使用 Google 註冊</span>
                    </button>

                    <button
                        className="w-full bg-white hover:bg-gray-50 border border-gray-200 hover:border-gray-300 text-gray-700 font-medium py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center space-x-3"
                        aria-label="使用 X 註冊"
                    >
                        <svg
                            className="w-5 h-5 text-gray-600"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                        >
                            <path
                                fill="currentColor"
                                d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
                            />
                        </svg>
                        <span>使用 X 註冊</span>
                    </button>
                </div>

                {/* 登入連結 */}
                <div className="mt-8 text-center">
                    <p className="text-gray-500 text-sm">
                        已經有帳戶了？{' '}
                        <a
                            href="#"
                            className="font-medium hover:opacity-80 transition-opacity duration-200"
                            style={getPrimaryColorStyle()}
                        >
                            立即登入
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Resgister;
