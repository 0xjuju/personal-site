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
  const isServer = typeof window === "undefined";

  // Use local API endpoint only during development
  const internal =
    process.env.API_BASE_INTERNAL || (process.env.NODE_ENV === "development" ? "http://localhost:8000" : "");
  const publicBase =
    process.env.NEXT_PUBLIC_API_BASE || (process.env.NODE_ENV === "development" ? "http://localhost:8000" : "");

  const base = isServer ? internal : publicBase;
  const url = base.replace(/\/$/, "") + (path.startsWith("/") ? path : `/${path}`);

  /* Execute fetch */
  const res = await fetch(url, {
    ...(typeof window !== "undefined" ? { credentials: "include" } : {}),
    ...fetchInit,
    headers: {
      "Content-Type": "application/json",
      ...fetchInit.headers,
    },
    next: nextOpts,
  });

  if (!res.ok) throw new Error(`API error ${res.status} on ${url}`);
  return res.json() as Promise<T>;
}
