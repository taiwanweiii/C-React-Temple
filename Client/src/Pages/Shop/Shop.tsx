import { useState, useEffect } from 'react';

// import ColorPickerIndex from '@components/ColorPicker';

// API
import { useApi } from "@hook/useApi";
import type { ApiResponseRegister } from "@type/api";

// Page
import ShopProductCard from '@pages/Shop/ShopProductCard';
import ShopProductGroup from '@pages/Shop/ShopProductGroup';

type ProductList = {
    id: number;
    title: string;
    descript: string;
    price: number;
    category: string;
    img: string;
    cartQuantity?: number;
}
type getProductsResponse = {
    id: number;
    title: string;
    descript: string;
    img: string;
    price: number;
    customize: number;
    online: number;
    status: string;
    company_id: string;
    category_id: number;
    category_name_en: string;
    category_name_zh: string;
    created_at: string;
    updated_at: string;
    deleted_at: null | string;
    cartQuantity: number;
}


function Shop() {
    const { callApi } = useApi<ApiResponseRegister>();
    // 設定產品分類
    const [selectedCategory, setSelectedCategory] = useState(1);
    const [products, setProducts] = useState<ProductList[]>([]);
    async function getProducts() {
        const result = await callApi('/products/GetProducts',
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ category: selectedCategory }),
            }
        )
        const formatted = result.data.map((p: getProductsResponse) => ({
            id: p.id,
            title: p.title,
            descript: p.descript,
            img: p.img,
            online: p.online,
            customize: p.customize,
            price: p.price,
            status: p.status,
            company_id: p.company_id,
            created_at: p.created_at,
            updated_at: p.updated_at,
            deleted_at: p.deleted_at,
            categoryId: p.category_id,
            categoryNameEn: p.category_name_en,
            categoryNameZh: p.category_name_zh,
            cartQuantity: p.cartQuantity,
        }));
        setProducts(formatted);
    }
    useEffect(() => {
        if (selectedCategory !== null) {
            getProducts()
        }
        // 篩選產品分類
        // setProducts((prev) => ({ ...prev }))
    }, [selectedCategory])

    return (
        <div>
            {/* <button className="bg-[var(--primary-color)] text-[var(--secondary-color)] px-4 py-2 rounded">
                Buy Now
            </button> */}
            <div className="">
                <div className="min-h-screen bg-gray-100 p-4">

                    {/* 分類 */}
                    <ShopProductGroup selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
                    {/* <!-- Product Grid --> */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {products.map((product, index) => (
                            <ShopProductCard
                                key={index}
                                product={product}
                                getProducts={getProducts}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Shop;