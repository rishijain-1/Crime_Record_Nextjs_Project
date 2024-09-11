import { cache } from "react";

export const getCurrentUser=cache(
    async () => {
        const res = await fetch("/api/auth/session");
        const data = await res.json();
        return data;
    }
)