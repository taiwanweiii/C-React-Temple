import { Link } from "react-router-dom";

import { useApi } from "@hook/useApi";
import type { ApiResponseRegister } from "@type/api";

import { useAppSelector } from '@hook/useStore';

import ROUTER from '@components/router.ts';

interface UserMenuProps {
    setIsUserMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function UserMenu({ setIsUserMenuOpen }: UserMenuProps) {
    const currentUser = useAppSelector((state) => state.user.session);

    const { callApi } = useApi<ApiResponseRegister>();
    const logout = async () => {
        const response = await callApi("/user/Logout", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            // body: JSON.stringify({ address, password }),
        });
        if (response && response.status === 'success') {
            window.location.href = "/"; // 登出成功後，重新導向到首頁
            localStorage.removeItem('token');
        } else {
            alert("登出失敗，請稍後再試。");
        }
    }
    return (
        <>
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2">
                <div className="px-4 py-2 bg-gray-200 text-gray-700 font-medium border-b border-gray-200">
                    {currentUser?.username ? currentUser.username : '訪客'}，您好
                </div>
                <hr className="" />

                <Link to={ROUTER.PROFILE}
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-50"
                    onClick={() => setIsUserMenuOpen(false)} // 點擊後關閉選單
                >
                    個人資料
                </Link>
                <Link to={ROUTER.ORDERS}
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-50"
                    onClick={() => setIsUserMenuOpen(false)} // 點擊後關閉選單
                >
                    訂單紀錄
                </Link>
                <Link to={ROUTER.COUPONS}
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-50"
                    onClick={() => setIsUserMenuOpen(false)} // 點擊後關閉選單
                >
                    優惠券
                </Link>
                <Link to={ROUTER.ADDRESSES}
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-50"
                    onClick={() => setIsUserMenuOpen(false)} // 點擊後關閉選單
                >
                    地址管理
                </Link>
                <hr className="my-1" />
                <button
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 cursor-pointer"
                    onClick={logout}
                >
                    登出
                </button>
            </div>
        </>
    );
}