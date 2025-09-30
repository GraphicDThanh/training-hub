from apis.middleware import auth_middleware
from apis.routers import auth_router, chat_router, health_router, history_router
from common.config.logging import setup_logging
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# setup_logging()

app = FastAPI(
    title="Customer Support Chat Bot Agent Server",
    version="0.1.0",
    description="Customer Support Agent Server",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"],
)

app.middleware("http")(auth_middleware)

for router in [health_router, chat_router, history_router, auth_router]:
    app.include_router(router)
