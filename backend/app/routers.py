from datetime import timedelta
from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, status

from app.auth import authenticate_user, create_access_token, get_current_user
from app.config import settings
from app.schemas import LoginRequest, Token

router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/login", response_model=Token, summary="Obtain a JWT access token")
def login(body: LoginRequest):
    """
    Authenticate with **username** and **password**.

    - Default credentials: `admin` / `admin123`
    - Returns a **JWT access token** valid for **300 seconds**.
    """
    user = authenticate_user(body.username, body.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token = create_access_token(
        data={"sub": user["username"]},
        expires_delta=timedelta(seconds=settings.access_token_expire_seconds),
    )
    return Token(
        access_token=access_token,
        token_type="bearer",
        expires_in=settings.access_token_expire_seconds,
    )


@router.post("/refresh", response_model=Token, summary="Refresh a JWT access token")
def refresh_token(current_user: Annotated[dict, Depends(get_current_user)]):
    """
    Send a valid JWT access token as `Bearer <token>` in the **Authorization** header.

    - Returns a **new** token with a fresh **300-second** expiration.
    """
    access_token = create_access_token(
        data={"sub": current_user["username"]},
        expires_delta=timedelta(seconds=settings.access_token_expire_seconds),
    )
    return Token(
        access_token=access_token,
        token_type="bearer",
        expires_in=settings.access_token_expire_seconds,
    )
