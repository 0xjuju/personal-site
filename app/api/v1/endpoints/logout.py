from fastapi import APIRouter, Request


router = APIRouter()


@router.post("/logout")
async def logout(request: Request):
    request.session.clear()
    return {"message": "Logged out"}


