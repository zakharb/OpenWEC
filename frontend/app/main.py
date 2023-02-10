from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates

from app import routes

app = FastAPI(openapi_url="/api/v1/openapi.json", 
              docs_url="/api/v1/docs")

app.mount("/static", StaticFiles(directory="app/static"), name="static")
app.mount("/js", StaticFiles(directory="app/js"), name="js")
app.mount("/components", StaticFiles(directory="app/components"), name="components")
app.mount("/styles", StaticFiles(directory="app/styles"), name="styles")

origins = ["*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(routes.router)
