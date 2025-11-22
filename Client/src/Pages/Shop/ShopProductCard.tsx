import { useState } from "react";

// API
import { useApi } from "@hook/useApi";
import type { ApiResponseRegister } from "@type/api";

//components
import Sweetalert from '@components/sweetalert2';

type Props = {
    product: {
        id: number;
        img: string;
        title: string;
        descript: string;
        category: string;
        price: number;
        cartQuantity?: number;
    },
    getProducts(): Promise<void>;
};
export default function ShopProductCard({ product, getProducts }: Props) {
    const { id, img, title, descript, price, cartQuantity } = product;
    const token = localStorage.getItem('token');
    const { callApi } = useApi<ApiResponseRegister>();
    const [qty, setQty] = useState(1);
    async function handleAddToCart() {
        try {
            const result = await callApi('/cart/AddToCart',
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`, },
                    body: JSON.stringify({ productId: id, quantity: qty })
                }
            )
            if (result.status === 'success') {
                Sweetalert.showSuccess('已加入購物車');
                setQty(1);
                getProducts();
            } else {
                Sweetalert.showWarning('加入購物車失敗: ' + result.message);
                getProducts();
            }
        } catch (err: any) {
            console.error("API 錯誤:", err);
            // err 可能是你 callApi 丟出來的
            if (err.body) {
                alert(`加入購物車失敗: ${err.body.message}`);
            } else {
                alert(`加入購物車失敗：伺服器錯誤${err}`);
            }
        }
    }

    return (<>
        <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition">
            <img
                src={img}
                alt="Product"
                className="w-full h-56 object-cover"
            />
            <div className="p-4 flex flex-col justify-between">
                <div>
                    <h2 className="text-lg font-semibold text-gray-800">{title ?? '尚未輸入'}</h2>
                    <div className="flex flex-row justify-between">
                        <div className="text-gray-500 text-sm mt-1">
                            {descript ?? '尚未輸入描述'}
                        </div>
                        <div className="flex items-center ">
                            {/* 減少按鈕 */}
                            <button
                                className="w-8 h-8 flex items-center justify-center 
                           bg-gray-200 rounded-lg hover:bg-gray-300 
                           active:scale-95 transition"
                                onClick={() => setQty(Math.max(0, qty - 1))}
                            >
                                -
                            </button>
                            {/* 數字 */}
                            <span className="w-8 text-center font-medium">{qty}</span>
                            {/* 增加按鈕 */}
                            <button
                                className="w-8 h-8 flex items-center justify-center 
                           bg-gray-200 rounded-lg hover:bg-gray-300 
                           active:scale-95 transition"
                                onClick={() => setQty(Math.min(99, qty + 1))}
                            >
                                +
                            </button>
                        </div>
                    </div>
                </div>
                <div className="flex justify-between items-center mt-4">
                    <span className="text-xl font-bold text-indigo-600">${price ?? '尚未輸入價格'}</span>
                    <div className="flex items-center space-x-2">
                        <span className="px-4 text-red-400">目前訂購量: {cartQuantity}</span>
                        <button
                            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 active:scale-95 transition"
                            onClick={handleAddToCart}
                        >
                            按我購買
                        </button>
                    </div>

                </div>
            </div>
        </div>
    </>);
}
