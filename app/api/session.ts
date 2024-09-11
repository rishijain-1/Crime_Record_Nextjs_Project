import { cache } from "react";

export const getCurrentUser = cache(async () => {
  try {
    const res = await fetch("/api/auth/session");

    if (!res.ok) {
      throw new Error(`Failed to fetch session: ${res.statusText}`);
    }

    const data = await res.json();

    return data || null;
  } catch (error) {
    console.error("Error fetching session:", error);
    return null; 
  }
});
