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

from fastapi import APIRouter, FastAPI, Request
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates

router = APIRouter()

templates = Jinja2Templates(directory="frontend/templates")

@router.get("/", response_class=HTMLResponse)
async def get_sources(request: Request):
    print('here')
    sources = [
        {
            'name': 'Source 1',
            'desc': 'Description 1'
        },
        {
            'name': 'Source 2',
            'desc': 'Description 2'
        },
    ]
    return templates.TemplateResponse("source/sources.html", 
                                      {"request": request, "sources": sources})

@router.get("/{id}/edit", response_class=HTMLResponse)
async def edit_source(request: Request, id: str):
    source = {
            'id': '1',
            'name': 'Source 1',
            'desc': 'Description 1'
        }
    return templates.TemplateResponse("source/edit_source.html", 
                                      {"request": request, "source": source})


@router.get("/123", response_class=HTMLResponse, name='front_list')
async def list_sources(request: Request, id: str):
    print(1123)