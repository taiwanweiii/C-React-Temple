import React from "react";
const generally: React.FC<{
    title: string,
    describe?: string,
    context: string
}> = ({ title, describe, context }) => {
    return (<>
        {/* max-w-sm */}
        <div className="w-full mx-auto bg-gray-100 hover:bg-gray-200 active:bg-gray-300 rounded-2xl shadow-lg overflow-hidden border border-gray-200">
            {/* 內容區域 */}
            <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
                {describe ?? <p className="text-sm text-gray-500 mt-1">{describe}</p>}

                <p className="text-gray-600 mt-4 leading-relaxed">
                    {context}
                </p>
                {/* 底部按鈕區域 */}
                {/* <div className="mt-6 flex justify-end gap-2">
                    <button className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 transition">
                        取消
                    </button>
                    <button className="px-4 py-2 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 shadow-md transition">
                        確定
                    </button>
                </div> */}
            </div>
            <div className="text-right px-4">2025/09/29</div>

        </div>
    </>);
}



const Card = { generally };
export default Card;