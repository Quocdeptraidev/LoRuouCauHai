from pydantic_settings import BaseSettings, SettingsConfigDict
from pydantic import Field

class Settings(BaseSettings):
    PROJECT_NAME: str = "Lò Rượu Cậu Hai API"
    API_V1_STR: str = "/api/v1"
    
    # Database Settings
    DATABASE_URL: str = Field(default="postgresql+asyncpg://postgres:postgres@db:5432/loruoucauhai")
    
    # Redis Settings
    REDIS_URL: str = Field(default="redis://redis:6379/0")
    
    # AI Settings
    GEMINI_API_KEY: str | None = Field(default=None)
    OPENAI_API_KEY: str | None = Field(default=None)

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore"
    )

settings = Settings()
