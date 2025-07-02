import httpx

from app.core.config import get_settings
settings = get_settings()


async def invalidate_cache(tag: str | list[str]) -> None:
    """ Send tag data to /api/revalidate endpoint to revalidate endpoint """
    try:
        url = f"{settings.frontend_internal}/api/revalidate"
        async with httpx.AsyncClient() as client:
            res = await client.post(url, json={"tag": tag, "token": settings.revalidation_key}, timeout=5)
            print(f"[cache] Response: {res.status_code} {res.text}")

    except httpx.HTTPError as exc:
        print(f"[cache] revalidate failed: {exc}")



