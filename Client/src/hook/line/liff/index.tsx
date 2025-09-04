// useLiff.ts
import { useState, useEffect } from 'react';
import liff from '@line/liff';
let LIFF_ID = import.meta.env.VITE_LINE_LIFF_ID || '1';

/*
    isAutoLogin 是否自動登入
*/
export const useLineLiff = (isAutoLogin: boolean) => {
    const [user, setUser] = useState<any>(null);

    const init = async () => {
        await liff.init({ liffId: LIFF_ID });
        if (isAutoLogin) {
            if (!liff.isLoggedIn()) liff.login();
            else {
                const profile = await liff.getProfile();
                setUser(profile);
            }
        }
    };

    const getUser = async () => {
        await liff.init({ liffId: LIFF_ID });
        if (liff.isLoggedIn()) {
            const profile = await liff.getProfile();
            setUser(profile);
        }
    };

    const logout = async () => {
        await liff.init({ liffId: LIFF_ID });
        liff.logout();
        setUser(null);
    };
    const login = async () => {
        await liff.init({ liffId: LIFF_ID });
        if (!liff.isLoggedIn()) liff.login();
    };
    const isLoggedIn = (): boolean => {
        return liff.isLoggedIn();
    };
    useEffect(() => {
        getUser();
        init();
    }, []);

    return { user, getUser, logout, login, isLoggedIn };
};
export default useLineLiff;
