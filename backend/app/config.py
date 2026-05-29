from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    # Must be set via the SECRET_KEY environment variable or .env file in production.
    # A fallback is provided only for local development convenience.
    secret_key: str = "dev-only-secret-key-CHANGE-before-deploying"
    algorithm: str = "HS256"
    access_token_expire_seconds: int = 300

    class Config:
        env_file = ".env"


settings = Settings()
