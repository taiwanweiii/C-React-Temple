import { useEffect } from 'react';
import { useThemeStore } from '@hook/useThemeStore';


/*
    使用方式
    import { useThemeStore } from '@hook/useThemeStore';

    const { primaryColor, secondaryColor } = useThemeStore();
*/
export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const { primaryColor, secondaryColor, mode } = useThemeStore();

    useEffect(() => {
        const root = document.documentElement;
        root.style.setProperty('--primary-color', primaryColor);
        root.style.setProperty('--secondary-color', secondaryColor);
        root.setAttribute('data-theme', mode);
    }, [primaryColor, secondaryColor, mode]);

    return <>{children}</>;
}
