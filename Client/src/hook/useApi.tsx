import { useState } from "react";
import { apiFetch } from "@tool/fetch/index";

export function useApi<T>() {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    async function callApi(endpoint: string, options?: RequestInit) {
        setLoading(true);
        setError(null);

        try {
            const result = await apiFetch<T>(endpoint, options);
            setData(result);
            return result;
        } catch (err) {
            setError(err as Error);
            throw err;
        } finally {
            setLoading(false);
        }
    }

    return { data, loading, error, callApi };
}
