import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Register from './Pages/Register';

import './App.css';

function App() {
    const [count, setCount] = useState(0);

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/Login" element={<Login />} />
                    <Route path="/Resgister" element={<Register />} />

                    {/* <Route path="/about" element={<About />} /> */}
                    {/* 其他未匹配到的路由 */}
                    {/* <Route path="*" element={<NotFound />} /> */}
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
