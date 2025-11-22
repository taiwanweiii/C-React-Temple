import { useState } from 'react';
// import ColorPickerIndex from '@components/ColorPicker';

import { useAppSelector, useAppDispatch } from '@hook/useStore'; // 根據實際路徑調整
import { setUser } from "@store/Auth/user";

import { useApi } from "@hook/useApi";
import type { ApiResponseRegister } from "@type/api";

//通知
import Sweetalert from '@components/sweetalert2';

interface Form {
    username?: string;
    role: 'guest' | 'member' | 'admin';
    phone?: string;
    email?: string;
    birthday?: string;
    gender?: string;
}
export default function UserProfile() {
    // callAPI
    const { callApi } = useApi<ApiResponseRegister>();

    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.user.session);

    const [isEditing, setIsEditing] = useState(false);
    const [form, setForm] = useState<Form>({
        username: user?.username || '',
        role: user?.role || 'guest',  // 必填
        phone: user?.phone || '',
        email: user?.email || '',
        birthday: user?.birthday || '',
        gender: user?.gender || '',
    })
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };
    const handleSave = async () => {
        if (form.phone && !/^\d{10}$/.test(form.phone)) {
            await Sweetalert.showWarning('電話號碼格式不正確，請輸入10位數字');
            return;
        } else if (form.username && form.username.length > 20) {
            await Sweetalert.showWarning('姓名長度不可超過20字元');
            return;
        }
        // 在這裡處理儲存邏輯，例如發送更新請求到後端
        const result = await callApi('/User/UpdateProfile',
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            }
        )
        if (result.status === 'success') {
            await Sweetalert.showSuccess(result.message || '登入成功');
            dispatch(setUser(form));
        } else {
            await Sweetalert.showWarning(result.message || '更新失敗');
        }
        setIsEditing(false);
    }

    if (!user) return <div>禁止進入需要登入的介面UserProfile</div>;

    return (
        <div className="w-[90%] max-w-md mx-auto m-6 bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200" >
            {/* 頭像區 */}
            < div className="flex flex-col items-center py-6 bg-gradient-to-b from-gray-100 to-gray-50" >
                <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-md">
                    <img
                        src="/img/user/user.png"
                        alt="user"
                        className="w-full h-full object-cover"
                    />
                </div>
                <h2 className="mt-3 text-xl font-semibold text-gray-800">{user?.username || '訪客'}</h2>
                <p className="text-sm text-gray-500">{user?.email || 'example@email.com'}</p>
            </div >

            {/* 分隔線 */}
            < div className="border-t border-gray-200" ></div >

            {/* 使用者資訊 */}
            <div className="px-6 py-4 divide-y divide-gray-200 text-gray-700">
                {(
                    [
                        { label: '姓名', field: 'username' },
                        { label: '電話', field: 'phone' },
                        // { label: 'Email', field: 'email' },
                        { label: '生日', field: 'birthday' },
                        { label: '性別', field: 'gender' },
                    ] as { label: string; field: keyof Form }[]
                ).map(({ label, field }) => (
                    <div key={field} className="flex justify-between items-center py-3 h-12">
                        <span className="font-medium">{label}：</span>
                        {isEditing ? (
                            field === 'gender' ? (
                                // 性別：radio
                                <div className="flex gap-4 w-3/4 justify-end">
                                    <label className="flex items-center gap-1">
                                        <input
                                            type="radio"
                                            name="gender"
                                            value="男"
                                            checked={form.gender === '男'}
                                            onChange={handleChange}
                                        />
                                        男
                                    </label>
                                    <label className="flex items-center gap-1">
                                        <input
                                            type="radio"
                                            name="gender"
                                            value="女"
                                            checked={form.gender === '女'}
                                            onChange={handleChange}
                                        />
                                        女
                                    </label>
                                </div>
                            ) : field === 'birthday' ? (
                                // 生日：日期選擇
                                <input
                                    type="date"
                                    name="birthday"
                                    value={form.birthday || ''}
                                    onChange={handleChange}
                                    className="border rounded-md px-2 py-1 w-3/4 focus:ring focus:ring-blue-300"
                                />
                            ) : (
                                // 其他欄位：一般輸入框
                                <input
                                    name={field}
                                    value={form[field] || ''}
                                    onChange={handleChange}
                                    className="border rounded-md px-2 py-1 w-3/4 focus:ring focus:ring-blue-300"
                                />
                            )
                        ) : (
                            // 非編輯模式
                            <span onClick={() => { console.log(user) }} className="text-gray-900 break-all w-3/4 text-right">
                                {user?.[field] || '-'}
                            </span>
                        )}
                    </div>
                ))}
            </div>


            {/* 底部按鈕 */}
            < div className="flex justify-center py-4 bg-gray-50 border-t" >
                {
                    isEditing ? (
                        <div className="flex gap-3" >
                            <button
                                className="px-5 py-2 bg-gray-400 text-white rounded-full shadow hover:bg-gray-500 transition-all duration-200"
                                onClick={() => setIsEditing(false)}
                            >
                                取消
                            </button>
                            <button
                                className="px-5 py-2 bg-blue-500 text-white rounded-full shadow hover:bg-blue-600 transition-all duration-200"
                                onClick={handleSave}
                            >
                                儲存
                            </button>
                        </div>
                    ) : (
                        <button
                            className="px-5 py-2 bg-blue-500 text-white rounded-full shadow hover:bg-blue-600 transition-all duration-200"
                            onClick={() => setIsEditing(true)}
                        >
                            編輯資料
                        </button>
                    )
                }
            </div >
        </div >
    );
}