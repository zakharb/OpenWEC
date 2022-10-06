"""
    OpenWEC
    DB module
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
        Make engine, connection to DB and tables
"""

import os
#import sqlalchemy
#from databases import Database
import motor.motor_asyncio
from bson import ObjectId


#DATABASE_URI = os.getenv('DATABASE_URI')
DATABASE_URI = "mongodb://zuser:fPfbYBDSNlZcAAPM@localhost/?authSource=ziem&authMechanism=SCRAM-SHA-256"
client = motor.motor_asyncio.AsyncIOMotorClient(DATABASE_URI)
db = client.ziem

class PyObjectId(ObjectId):
    @classmethod
    def __get_validators__(cls):
        yield cls.validate

    @classmethod
    def validate(cls, v):
        if not ObjectId.is_valid(v):
            raise ValueError("Invalid objectid")
        return ObjectId(v)

    @classmethod
    def __modify_schema__(cls, field_schema):
        field_schema.update(type="string")