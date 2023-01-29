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

from pydantic import BaseModel
from typing import Optional
from .db import PyObjectId
from pydantic import BaseModel, Field
from bson import ObjectId


class InSourceModel(BaseModel):
    name: str = Field(...)
    desc: str = Field(...)

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
        schema_extra = {
            "example": {
                "name": "Source name",
                "body": "Source description",
            }
        }

class OutSourceModel(InSourceModel):
    _id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")


class UpdateSourceModel(InSourceModel):
    _id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    name: str = Field(...)
    desc: str = Field(...)

    class Config:
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
        schema_extra = {
            "example": {
                "name": "Source name",
                "body": "Source description",
            }
        }
