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
        Pydantic models to make docs and check types
"""

from bson import ObjectId
from typing import Optional
from pydantic import BaseModel
from pydantic import BaseModel, Field

from app.db import PyObjectId

class InLogModel(BaseModel):
    name: str = Field(...)
    desc: str = Field(...)

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
        schema_extra = {
            "example": {
                "name": "Log name",
                "desc": "Log description",
            }
        }

class OutLogModel(InLogModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")


class UpdateLogModel(InLogModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    name: str = Field(...)
    desc: str = Field(...)

    class Config:
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
        schema_extra = {
            "example": {
                "name": "Log name",
                "desc": "Log description",
            }
        }
