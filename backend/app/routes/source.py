"""
    OpenWEC
    Copyright (C) 2022

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>.

    Author:
        Bengart Zakhar

    Description:
        Routers for operations with API
"""

from typing import List
from fastapi import APIRouter, Body, HTTPException, status
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder

from app.models.source import InSourceModel, OutSourceModel, UpdateSourceModel
from app.db import db

router = APIRouter()

@router.get("/", 
            response_description="List all sources", 
            response_model=List[OutSourceModel])
async def source_list():
    sources = await db["sources"].find().to_list(1000)
    return sources

@router.get("/{id}", 
            response_description="Get a single source",
            response_model=OutSourceModel)
async def source_get(id: str):
    source = await db["sources"].find_one({"_id": Object(id)})
    if not source:
        raise HTTPException(status_code=404, detail=f"Source {id} not found")
    return source

@router.post("/", 
             response_description="Add new source", 
             response_model=OutSourceModel)
async def source_post(source: InSourceModel = Body(...)):
    created_source = jsonable_encoder(source)
    new_source = await db["sources"].insert_one(source)
    created_source = await db["sources"].find_one({"_id": new_source.inserted_id})
    return JSONResponse(status_code=status.HTTP_201_CREATED, content=created_source)

@router.put("/{id}", 
            response_description="Update a source", 
            response_model=UpdateSourceModel)
async def update_source(id: str, source: UpdateSourceModel = Body(...)):
    source = {k: v for k, v in source.dict().items() if v is not None}
    if len(source) >= 1:
        update_result = await db["sources"].update_one({"_id": Object(id)}, {"$set": source})
        if update_result.modified_count == 1:
            updated_source = await db["sources"].find_one({"_id": Object(id)})
            if updated_source:
                return updated_source
    existing_source = await db["sources"].find_one({"_id": Object(id)})
    if existing_source:
        return existing_source
    raise HTTPException(status_code=404, detail=f"Source {id} not found")

@router.delete("/{id}", 
               response_description="Delete a source",
               status_code=status.HTTP_204_NO_CONTENT)
async def delete_source(id: str):
    delete_result = await db["sources"].delete_one({"_id": Object(id)})
    if delete_result.deleted_count == 1:
        return id
    raise HTTPException(status_code=404, detail=f"Source {id} not found")