from fastapi import FastAPI
from app.api.posts import router as posts_router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(openapi_url="/api/v1/posts/openapi.json", 
              docs_url="/api/v1/posts/docs")

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(posts_router, prefix='/api/v1/posts', tags=['posts'])