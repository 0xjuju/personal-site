type NextFetchOpts = {
    revalidate?: number;
    tags?: string[];
};

export async function apiFetch<T>(
    path: string,
    init: RequestInit & { nextOpts?: NextFetchOpts } = {}
): Promise<T> {

    const { nextOpts, ...fetchInit } = init;

    /* Base URL resolution */
    const internal = process.env.API_BASE_INTERNAL || "http://backend:8000";
    const publicBase = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:8000";
    const base = typeof window === "undefined" ? internal : publicBase;
    const url = base.replace(/\/$/, "") + (path.startsWith("/") ? path : `/${path}`);

    /* Execute fetch */
    const res = await fetch(url, {
        ...(typeof window !== "undefined" ? { credentials: "include" } : {}),
        ...fetchInit,
        headers: {
            "Content-Type": "application/json",
            ...fetchInit.headers,
        },
        next: nextOpts,            // Now accepts { revalidate, tags }
    });

    if (!res.ok) throw new Error(`API error ${res.status} on ${url}`);
    return res.json() as Promise<T>;
}
