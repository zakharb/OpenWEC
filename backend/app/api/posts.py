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
from app.api.models import PostModel, UpdatePostModel
from .db import db
from fastapi.encoders import jsonable_encoder

router = APIRouter()


@router.post("/", 
             response_description="Add new post", 
             response_model=PostModel)
async def create_post(post: PostModel = Body(...)):
    post = jsonable_encoder(post)
    new_post = await db["posts"].insert_one(post)
    created_post = await db["posts"].find_one({"_id": new_post.inserted_id})
    return JSONResponse(status_code=status.HTTP_201_CREATED, content=created_post)

@router.get("/", 
            response_description="List all posts", 
            response_model=List[PostModel])
async def list_posts():
    posts = await db["posts"].find().to_list(1000)
    return posts


@router.get("/{id}", 
            response_description="Get a single post", 
            response_model=PostModel)
async def show_post(id: str):
    post = await db["posts"].find_one({"_id": id})
    if post:
        return post
    raise HTTPException(status_code=404, detail=f"Post {id} not found")


@router.put("/{id}", 
            response_description="Update a post", 
            response_model=PostModel)
async def update_post(id: str, post: UpdatePostModel = Body(...)):
    post = {k: v for k, v in post.dict().items() if v is not None}
    if len(post) >= 1:
        update_result = await db["posts"].update_one({"_id": id}, {"$set": post})
        if update_result.modified_count == 1:
            updated_post = await db["posts"].find_one({"_id": id})
            if updated_post:
                return updated_post
    existing_post = await db["posts"].find_one({"_id": id})
    if existing_post:
        return existing_post
    raise HTTPException(status_code=404, detail=f"Post {id} not found")


@router.delete("/{id}", 
               response_description="Delete a post")
async def delete_post(id: str):
    delete_result = await db["posts"].delete_one({"_id": id})
    if delete_result.deleted_count == 1:
        return JSONResponse(status_code=status.HTTP_204_NO_CONTENT)
    raise HTTPException(status_code=404, detail=f"Post {id} not found")