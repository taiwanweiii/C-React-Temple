import { apiFetch } from "@tool/fetch/index";
import type { ApiResponseRegister } from "@type/api";

//components
import Sweetalert from '@components/sweetalert2';

type Prop = {
    cartList: {
        id: number;
        title: string;
        price: number;
        qty: number;
        img: string;
    };
    updateQty: (id: number, delta: number) => void;
    removeItem: (id: number) => void;
}
export default function CartItem({ cartList, updateQty, removeItem }: Prop) {
    const { id, title, price, qty, img } = cartList;

    function deletted(id: number) {
        removeItem(id);
    }
    async function removeCartItem(id: number) {
        const check = await Sweetalert.showAlert('警告', '是否刪除產品?', 'error', '刪除', '取消');
        if (check.isConfirmed) {
            const result = await apiFetch<ApiResponseRegister>(`/cart/RemoveCartItem`, {
                method: 'DELETE',
                body: JSON.stringify({ productId: id }) // 必填欄位
            });
            if (result.status === 'success') {
                deletted(id);
                Sweetalert.showSuccess('刪除成功');
            } else {
                alert('刪除失敗');
            }
        }

    }
    return (
        <>
            <div className="flex gap-3 border-b pb-3 mb-3" key={id}>
                <img className="w-16 h-16 rounded object-cover"
                    src={img || undefined}
                    alt={title}
                />
                <div className="flex-1">
                    <h4 className="font-semibold">{title}</h4>
                    <p className="text-sm text-gray-500">${price}</p>

                    <div className="flex items-center gap-2 mt-2">
                        <button
                            className="px-2 bg-gray-200 rounded"
                            onClick={() => updateQty(id, -1)}
                        >
                            -
                        </button>

                        <span className="min-w-[20px] text-center">{qty}</span>

                        <button
                            className="px-2 bg-gray-200 rounded"
                            onClick={() => updateQty(id, +1)}
                        >
                            +
                        </button>
                    </div>
                </div>
                <div className='flex items-center justify-center'>${price * qty}</div>
                <button
                    className="text-red-500 hover:text-red-600"
                    onClick={() => removeCartItem(id)}
                >
                    刪除
                </button>
            </div>
        </>
    )
}