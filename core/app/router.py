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
from fastapi import Request

router = APIRouter()

@router.post("/")
#, 
 # response_description="Add new log", 
 # response_model=OutLogModel,
 # status_code=status.HTTP_201_CREATED)
async def log_post(request: Request):
    #log: InLogModel = Body(...)):
    #print(await request.json())
    content_length = request.headers['Content-Length']
    print('[*] Content length: ', content_length)
    content_type = request.headers['Content-Type'].split(';')
    print('[*] Content type: ', content_type)
    if len(content_type) > 1:
        charset = content_type[1].strip()[8:]
        print('[*] Content charset: ', charset)
    else:
        charset = None

    body = await request.body()
    if charset == 'UTF-16':
        text = body.decode('utf16')
    else:
        text = body.decode('utf8')
    print('[+] Content text:')
    print(text)
    #content_length = int(self.headers['Content-Length']) if 'Content-Length' in self.headers else 0

    #created_log = jsonable_encoder(log)
    #new_log = await db["logs"].insert_one(created_log)
    #created_log = await db["logs"].find_one({"_id": new_log.inserted_id})
    return

