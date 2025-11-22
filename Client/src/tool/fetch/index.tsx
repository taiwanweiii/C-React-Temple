// api.ts
export const API_BASE = ""; // 可以改成你的 API 網址

// 泛型 T → 讓你定義回傳資料的型別
export async function apiFetch<T>(
    endpoint: string,
    options: RequestInit = {}
): Promise<T> {
    const url = `${API_BASE}${endpoint}`;
    const token = localStorage.getItem('token');
    try {
        const res = await fetch('/api' + url, {
            ...options,
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`,//加入 token 到請求頭
                ...(options.headers || {}),
            },
        });

        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        return (await res.json()) as T;
    } catch (err) {
        console.error("Fetch error:", err);
        throw err;
    }
}
