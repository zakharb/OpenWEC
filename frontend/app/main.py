from fastapi import FastAPI
import backend.source
# from backend.source import router as source_backend
from frontend.source import router as source_frontend
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from pprint import pprint
app = FastAPI(openapi_url="/api/v1/source/openapi.json", 
              docs_url="/api/v1/source/docs")

app.mount("/static", StaticFiles(directory="frontend/static"), name="static")

origins = ["*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(source_frontend, prefix='/source', tags=['frontend'])
app.include_router(backend.source.router, prefix='/api/v1/source', tags=['backend'])

pprint(app.routes)