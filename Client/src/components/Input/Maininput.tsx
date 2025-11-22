import type { ReactNode } from 'react';
import useColorPicker from '@hook/useColorPicker';


interface MainInputProps {
    id: string;
    type?: string;
    icon?: ReactNode;
    value: string;
    placeholder?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onFocus?: () => void;
    onBlur?: () => void;
    focusedField?: string | null;
    getInputStyle?: (field: string) => React.CSSProperties;
    required?: boolean;
    autoComplete?: string;
    error?: string;
}

export function MainInput({
    id,
    type = 'text',
    icon,
    value,
    placeholder,
    onChange,
    onFocus,
    onBlur,
    focusedField,
    getInputStyle,
    required = false,
    autoComplete = 'off',
    error,
}: MainInputProps) {
    const primaryColor = useColorPicker(state => state.primaryColor);

    return (
        <div className="mb-4">
            <div className="relative">
                {/* icon */}
                {icon && (
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                        {icon}
                    </div>
                )}

                <input
                    id={id}
                    type={type}
                    value={value}
                    onChange={onChange}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    className={`w-full pl-${icon ? '10' : '4'} pr-4 py-3 border rounded-lg text-gray-900 placeholder-gray-400 bg-white transition-all duration-200 focus:outline-none 
                        ${focusedField === id
                            ? 'ring-1 ring-blue-500 border-blue-400'
                            : 'border-gray-200 hover:border-gray-300'}
                    ${error ? 'border-red-500 ring-1 ring-red-400' : ''}
          `}
                    style={getInputStyle ? getInputStyle(id) : {}}
                    placeholder={placeholder}
                    required={required}
                    autoComplete={autoComplete}
                />
            </div>
            <button className='bg-red-500 rounded-b-full w-full'
                onClick={() => {
                    console.log(primaryColor)
                }}>CLin</button>
            {/* error message */}
            {error && (
                <p className="text-red-500 text-sm mt-1">{error}</p>
            )}
        </div>
    );
}