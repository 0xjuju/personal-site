import { revalidateTag } from "next/cache";


export async function POST(req: Request) {
    const { tag , token } = (await req.json()) as { tag: string | string[], token: string };
    if (token !== process.env.REVALIDATION_KEY) {
        return new Response("Unauthorized", { status: 401 });
    }

    if (!tag) return Response.json({ error: "no tag" }, { status: 400 });

    (Array.isArray(tag) ? tag : [tag]).forEach(revalidateTag);
    return Response.json({ ok: true, revalidated: tag });
}
