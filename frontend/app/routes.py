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
import json
from fastapi import APIRouter, FastAPI, Request
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates

router = APIRouter()

templates = Jinja2Templates(directory="app/pages")

@router.get("/", response_class=HTMLResponse)
async def main(request: Request):
    return templates.TemplateResponse("base.html", 
                                      {"request": request})

@router.get("/source", response_class=HTMLResponse)
async def get_source(request: Request):
    return templates.TemplateResponse("source.html", 
                                      {"request": request})
