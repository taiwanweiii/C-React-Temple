import { useEffect, useState } from "react";

// API
import { useApi } from "@hook/useApi";
import type { ApiResponseRegister } from "@type/api";

type ShopProductGroupProps = {
    selectedCategory: number;
    setSelectedCategory: (category: number) => void;
};

type CategoryGroup = {
    category_id: number;
    category_name_zh: string;
    category_name_en: string;
};
// const categories = ["全部", "食品", "民生", "其他"];

export default function ShopProductGroup({ selectedCategory, setSelectedCategory }: ShopProductGroupProps) {
    const { callApi } = useApi<ApiResponseRegister>();
    const [categories, setCategories] = useState<CategoryGroup[]>([]);
    useEffect(() => {
        async function getCategories() {
            const result = await callApi('/Products/GetProductsGroup',
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                }
            )
            if (result.status === 'success') {
                setCategories(result.data);
            }
        }
        getCategories();
    }, [])
    // const filteredProducts =
    //     selectedCategory === "全部"
    //         ? products
    //         : products.filter((p) => p.category === selectedCategory);
    return (<>
        {/* Category Tabs */}
        <div className="flex overflow-x-auto gap-2 mb-6 pb-2 scrollbar-hide" >
            {
                categories.map((cat) => (
                    <button
                        key={cat.category_id}
                        onClick={() => setSelectedCategory(cat.category_id)}
                        className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition ${selectedCategory === cat.category_id
                            ? "bg-indigo-600 text-white"
                            : "bg-white text-gray-700 border border-gray-300"
                            }`}
                    >
                        {cat.category_name_zh}
                    </button>
                ))
            }
        </div >
    </>);
}