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
from bson import ObjectId

from app.models.log import InLogModel, OutLogModel, UpdateLogModel
from app.db import db

router = APIRouter()

@router.get("/", 
            response_description="List all logs", 
            response_model=List[OutLogModel])
async def log_list():
    logs = await db["logs"].find().to_list(1000)
    return logs

@router.get("/{id}", 
            response_description="Get a single log",
            response_model=OutLogModel)
async def log_get(id: str):
    log = await db["logs"].find_one({"_id": ObjectId(id)})
    if not log:
        raise HTTPException(status_code=404, detail=f"Log {id} not found")
    return log

@router.post("/", 
             response_description="Add new log", 
             response_model=OutLogModel,
             status_code=status.HTTP_201_CREATED)
async def log_post(log: InLogModel = Body(...)):
    created_log = jsonable_encoder(log)
    new_log = await db["logs"].insert_one(created_log)
    created_log = await db["logs"].find_one({"_id": new_log.inserted_id})
    return created_log

@router.put("/{id}", 
            response_description="Update a log", 
            response_model=UpdateLogModel)
async def log_put(id: str, log: UpdateLogModel = Body(...)):
    log = {k: v for k, v in log.dict().items() if v is not None}
    if len(log) >= 1:
        update_result = await db["logs"].update_one({"_id": ObjectId(id)}, {"$set": log})
        if update_result.modified_count == 1:
            updated_log = await db["logs"].find_one({"_id": ObjectId(id)})
            if updated_log:
                return updated_log
    existing_log = await db["logs"].find_one({"_id": ObjectId(id)})
    if existing_log:
        return existing_log
    raise HTTPException(status_code=404, detail=f"Log {id} not found")

@router.delete("/{id}", 
               response_description="Delete a log",
               status_code=status.HTTP_204_NO_CONTENT)
async def log_delete(id: str):
    delete_result = await db["logs"].delete_one({"_id": ObjectId(id)})
    if delete_result.deleted_count == 1:
        return None
    raise HTTPException(status_code=404, detail=f"Log {id} not found")
