import { useState } from 'react';
import { useAsyncRetry } from 'react-use';
import { apiFetch } from "@tool/fetch/index";

import CartItem from './CartItem';

// API
import { useApi } from "@hook/useApi";
import type { ApiResponseRegister } from "@type/api";

type CartItem = {
    id: number;
    title: string;
    price: number;
    qty: number;
    img: string;
};

export default function Cart() {
    const { callApi } = useApi<ApiResponseRegister>();
    const [cartLists, setCartLists] = useState<CartItem[]>([
        { id: 1, title: 'test', price: 100, qty: 2, img: '' },
        { id: 2, title: 'test', price: 100, qty: 2, img: '' },
        { id: 33, title: 'test', price: 100, qty: 2, img: '' },
        { id: 4, title: 'test', price: 100, qty: 2, img: '' },
        { id: 5, title: 'test', price: 100, qty: 2, img: '' },
    ]);
    // 🟢 取得購物車列表
    const { loading } = useAsyncRetry(async () => {
        const result = await callApi('/cart/GetCartItems',
            {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            }
        );
        if (result.status === 'success') {
            console.log(result.data);
            setCartLists(result.data);
        }
        return 'result.data';
    }, []);
    if (loading) {
        return <div>Loading...</div>
    }
    // 🟢 調整某一項 qty
    async function updateQty(id: number, delta: number) {
        console.log(id, delta);
        const result = await apiFetch<ApiResponseRegister>(`/cart/UpdateCartItemQty`, {
            method: 'PUT',
            body: JSON.stringify({ productId: id, delta: delta }) // 必填欄位
        });
        if (result.status == 'success') {
            setCartLists(prev =>
                prev.map(item =>
                    item.id === id
                        ? { ...item, qty: Math.max(1, item.qty + delta) }
                        : item
                )
            );
        } else {
            alert('更新數量失敗');
        }
    }
    // 🗑 刪除項目
    function removeItem(id: number) {
        setCartLists(prev => prev.filter(item => item.id !== id));
    }
    return (
        <div className="p-4">
            {cartLists.map(cartList =>
                <CartItem cartList={cartList} key={cartList.id} updateQty={updateQty} removeItem={removeItem} />
            )}
        </div>
    );
}
