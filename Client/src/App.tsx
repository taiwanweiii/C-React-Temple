import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

//Page
import Home from '@pages/Home/Index';
import Login from '@pages/Login';
import Register from '@pages/Register';
import UserProfile from '@pages/UserProfile/UserProfile';
import Loading from '@pages/Loading/Loading';

import ScrollToTop from '@pages/ScrollToTop';

import { fetchUser } from '@/store/Auth/user';
import { useAppDispatch, useAppSelector } from '@hook/useStore'; // 根據實際路徑調整

import './App.css';
import MainLayout from "./layouts/MainLayout";


function App() {
    const dispatch = useAppDispatch(); // ✅ 使用型別化 dispatch
    const { session: _, loading } = useAppSelector((state) => state.user);

    useEffect(() => {
        dispatch(fetchUser());
    }, [dispatch]);
    if (loading) {
        return <Loading />;
    }
    return (
        <>
            <BrowserRouter>
                <ScrollToTop />

                <Routes>
                    <Route path="/" element={
                        <MainLayout>
                            <Home />
                        </MainLayout>
                    } />
                    {/* -----登入後頁面----- */}
                    <Route path="/user/profile" element={
                        <MainLayout>
                            <UserProfile />
                        </MainLayout>
                    } />
                    {/* ------------------ */}

                    <Route path="/Login" element={
                        <MainLayout>
                            <Login />
                        </MainLayout>

                    } />
                    <Route path="/Register" element={
                        <MainLayout>
                            <Register />
                        </MainLayout>
                    } />

                    {/* <Route path="/about" element={<About />} /> */}
                    {/* 其他未匹配到的路由 */}
                    {/* <Route path="*" element={<NotFound />} /> */}
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
