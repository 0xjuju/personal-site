from httpx import AsyncClient
import pytest
from tests.data import seed_about


@pytest.mark.asyncio
async def test_read_about(client: AsyncClient, session):
    await seed_about(session)

    res = await client.get("/api/about")
    assert res.status_code == 200
    data = res.json()

    assert data["top_header"] == "About Top"
    assert data["stories"][0]["slides"][0]["text"] == "Slide one content"
