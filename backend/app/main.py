from fastapi import FastAPI

from app.routers import router as auth_router

app = FastAPI(
    title="JWT Auth Service",
    description="FastAPI application demonstrating JWT authentication.",
    version="0.1.0",
)

app.include_router(auth_router)


@app.get("/health", tags=["health"])
def health_check():
    """Simple health-check endpoint."""
    return {"status": "ok"}
