
from fastapi import HTTPException
from functools import wraps
from typing import Callable, Awaitable, TypeVar, ParamSpec


T = TypeVar("T")
P = ParamSpec("P")


def raise_if_empty(detail: str = "Empty Container"):
    """
    Raise error if function returns empty container
    :param detail: Error message
    """
    def decorator(func: Callable[P, Awaitable[T]]) -> Callable[P, Awaitable[T]]:
        @wraps(func)
        async def wrapper(*args: P.args, **kwargs: P.kwargs) -> T:
            result = await func(*args, **kwargs)
            if not result:
                raise HTTPException(status_code=404, detail=detail)
            return result
        return wrapper
    return decorator





