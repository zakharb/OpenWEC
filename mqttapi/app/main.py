from fastapi import FastAPI
from app.api.mqtt import router as mqtt_router

app = FastAPI(openapi_url="/api/v1/mqtt/openapi.json", 
              docs_url="/api/v1/mqtt/docs")

app.include_router(mqtt_router, prefix='/api/v1/mqtt', tags=['mqtt'])