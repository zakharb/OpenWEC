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

from typing import List, Optional
from fastapi import APIRouter, FastAPI, Body, HTTPException, status
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder

from backend.model import InSourceModel, OutSourceModel, UpdateSourceModel
from backend.db import db

router = APIRouter()

@router.post("/", 
             response_description="Add new source", 
             response_model=OutSourceModel)
async def create_source(source: InSourceModel = Body(...)):
    created_source = jsonable_encoder(source)
    created_source['_id'] = 2
    print(created_source)
    #new_source = await db["sources"].insert_one(source)
    #created_source = await db["sources"].find_one({"_id": new_source.inserted_id})
    return JSONResponse(status_code=status.HTTP_201_CREATED, content=created_source)

@router.get("/")
            # ", 
            # response_description="List all sources", 
            # response_model=List[OutSourceModel])
async def list_sources():
    #sources = await db["sources"].find().to_list(1000)
    source = {
        '_id': '1',
        'name': 'Source x',
        'desc': 'Description 1',
        'logs': 'Log1, Log2',
        'pubdate': '01 Dec 2022',
    }
    sources = [ source for i in range(1,1000)]
    # sources = [
    #     {
    #         '_id': '1',
    #         'name': 'Source x',
    #         'desc': 'Description 1',
    #         'logs': 'Log1, Log2',
    #         'pubdate': '01 Dec 2022',
    #     },
    #     {
    #         '_id': '2',
    #         'name': 'Source 2',
    #         'desc': 'Description 2',
    #         'logs': 'Log1, Log2',
    #         'pubdate': '01 Dec 2022',
    #     },
    # ]
    return sources

@router.get("/{id}", 
            response_description="Get a single source")
            #, 
            #response_model=OutSourceModel)
async def show_source(id: str):
    # source = await db["sources"].find_one({"_id": id})
    source = {
            '_id': '1',
            'name': 'Source x',
            'desc': 'Description 1',
            'logs': 'Log1, Log2',
            'pubdate': '01 Dec 2022',
        }
    if source:
        return source
    raise HTTPException(status_code=404, detail=f"Source {id} not found")

@router.put("/{_id}", 
            response_description="Update a source", 
            response_model=UpdateSourceModel)
async def update_source(_id: str, source: UpdateSourceModel = Body(...)):
    source = {k: v for k, v in source.dict().items() if v is not None}
    if len(source) >= 1:
        update_result = await db["sources"].update_one({"_id": _id}, {"$set": source})
        if update_result.modified_count == 1:
            updated_source = await db["sources"].find_one({"_id": _id})
            if updated_source:
                print(updated_source)
                return updated_source
    existing_source = await db["sources"].find_one({"_id": _id})
    if existing_source:
        return existing_source
    raise HTTPException(status_code=404, detail=f"Source {_id} not found")

@router.delete("/{id}", 
               response_description="Delete a source",
               status_code=200)
async def delete_source(id: str):
    # delete_result = await db["sources"].delete_one({"_id": id})
    delete_result = 1
    # if delete_result.deleted_count == 1:
        # return JSONResponse(status_code=status.HTTP_204_NO_CONTENT)
    if delete_result == 1:
        return id
    raise HTTPException(status_code=404, detail=f"Source {id} not found")