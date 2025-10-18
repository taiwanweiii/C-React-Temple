// api.ts
export const API_BASE = ""; // 可以改成你的 API 網址

// 泛型 T → 讓你定義回傳資料的型別
export async function apiFetch<T>(
    endpoint: string,
    options: RequestInit = {}
): Promise<T> {
    const url = `${API_BASE}${endpoint}`;

    try {
        const res = await fetch('/api' + url, {
            headers: {
                "Content-Type": "application/json",
                ...(options.headers || {}),
            },
            ...options,
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
