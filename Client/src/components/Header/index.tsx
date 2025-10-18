import { useState } from 'react';
import { ShoppingCart, User, MapPin, ChevronDown, Heart, Star, KeyRound, ClipboardPen } from 'lucide-react';
import { useAppSelector } from '@hook/useStore';

import { Link } from "react-router-dom";
import ROUTER from '@components/router.ts';

import UserMenu from "@components/Header/UserMenu";
export default function Header() {
    const currentUser = useAppSelector((state) => state.user.session);

    const [isMenuOpen, _setIsMenuOpen] = useState(false);
    const [cartCount, _setCartCount] = useState(3);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

    return (
        <header className="bg-white shadow-md sticky top-0 z-50">
            {/* <button className="bg-green-400 w-full" onClick={() => { console.log(currentUser) }}> Click Me</button> */}
            {/* Top Bar */}
            {/* <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white py-1">
                <div className="container mx-auto px-4 flex justify-between items-center text-sm">
                    <div className="flex items-center gap-2">
                        <Clock className="w-3 h-3" />
                        <span>平均送達時間 30-40 分鐘</span>
                    </div>
                    <div className="hidden md:flex items-center gap-4">
                        <a href="#" className="hover:underline">成為合作夥伴</a>
                        <a href="#" className="hover:underline">外送員招募</a>
                    </div>
                </div>
            </div> */}

            {/* Main Header */}
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between py-4">
                    {/* Logo */}
                    <div className="flex items-center gap-4">
                        {/* <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
                        >
                            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button> */}
                        <Link to={ROUTER.HOME}
                            onClick={() => setIsUserMenuOpen(false)}
                        >
                            <div className="flex items-center gap-2">
                                <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                                    <span className="text-white font-bold text-xl">F</span>
                                </div>
                                <span className="text-2xl font-bold text-gray-800 whitespace-nowrap">Z人學</span>
                            </div>
                        </Link>
                    </div>

                    {/* Location Selector */}
                    {/* <div className="hidden md:flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-full hover:bg-gray-100 cursor-pointer">
                        <MapPin className="w-5 h-5 text-orange-500" />
                        <span className="text-gray-700">台南市東區</span>
                        <ChevronDown className="w-4 h-4 text-gray-500" />
                    </div> */}

                    {/* Search Bar */}
                    {/* <div className="hidden lg:flex items-center flex-1 max-w-xl mx-6">
                        <div className="relative w-full">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="搜尋餐廳、美食或料理"
                                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-full focus:outline-none focus:border-orange-500"
                            />
                        </div>
                    </div> */}

                    {/* Right Actions */}
                    {currentUser?.role === 'member' ?
                        <div className="flex items-center gap-3">
                            {/* Favorites */}
                            <button className="hidden md:flex p-2 hover:bg-gray-100 rounded-full relative">
                                <Heart className="w-6 h-6 text-gray-600" />
                            </button>

                            {/* Cart */}
                            <button className="p-2 hover:bg-gray-100 rounded-full relative">
                                <ShoppingCart className="w-6 h-6 text-gray-600" />
                                {cartCount > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                        {cartCount}
                                    </span>
                                )}
                            </button>

                            {/* User Menu */}
                            <div className="relative">
                                <button
                                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                                    className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-full"
                                >
                                    <User className="w-6 h-6 text-gray-600" />
                                    <span className="hidden md:block text-sm text-gray-700">我的帳戶</span>
                                    <ChevronDown className="w-4 h-4 text-gray-500 hidden md:block" />
                                </button>
                                {/* Dropdown Menu */}
                                {isUserMenuOpen && (
                                    <UserMenu setIsUserMenuOpen={setIsUserMenuOpen} />

                                )}
                            </div>
                        </div>
                        : <div className="flex items-center gap-3">
                            {/* Favorites */}
                            <Link
                                to={ROUTER.REGISTER}
                                className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-full "
                            >
                                <ClipboardPen className="w-6 h-6 text-gray-600" />
                                <span className="hidden md:block text-sm text-gray-700">註冊</span>

                            </Link>

                            {/* User Menu */}
                            <div className="relative">
                                <Link
                                    to={ROUTER.LOGIN}
                                    className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-full "
                                >
                                    <KeyRound className="w-6 h-6 text-gray-600" />
                                    <span className="hidden md:block text-sm text-gray-700">登入</span>
                                </Link>
                            </div>
                        </div>
                    }
                </div>

                {/* Mobile Search */}
                {/* <div className="lg:hidden pb-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="搜尋餐廳或美食"
                            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-full focus:outline-none focus:border-orange-500"
                        />
                    </div>
                </div> */}
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="lg:hidden border-t border-gray-200">
                    <div className="container mx-auto px-4 py-4">
                        <div className="flex flex-col gap-3">
                            <a href="#" className="flex items-center gap-3 py-2 text-gray-700 hover:text-orange-500">
                                <MapPin className="w-5 h-5" />
                                <span>選擇地址</span>
                            </a>
                            <a href="#" className="flex items-center gap-3 py-2 text-gray-700 hover:text-orange-500">
                                <Heart className="w-5 h-5" />
                                <span>我的最愛</span>
                            </a>
                            <a href="#" className="flex items-center gap-3 py-2 text-gray-700 hover:text-orange-500">
                                <Star className="w-5 h-5" />
                                <span>優惠活動</span>
                            </a>
                            <hr />
                            <a href="#" className="py-2 text-gray-700 hover:text-orange-500">成為合作夥伴</a>
                            <a href="#" className="py-2 text-gray-700 hover:text-orange-500">外送員招募</a>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
};