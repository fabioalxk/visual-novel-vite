# server/backend/server.py
from fastapi import FastAPI, HTTPException, Query
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
import httpx
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/signed-url")
async def get_signed_url(model: str = Query("karen")):
    if model == "amanda":
        agent_id = os.getenv("AMANDA_AGENT_ID")
    else:
        agent_id = os.getenv("KAREN_AGENT_ID")
    
    xi_api_key = os.getenv("XI_API_KEY")
    
    if not agent_id or not xi_api_key:
        raise HTTPException(status_code=500, detail="Missing environment variables")
    
    url = f"https://api.elevenlabs.io/v1/convai/conversation/get_signed_url?agent_id={agent_id}"
    
    async with httpx.AsyncClient() as client:
        try:
            response = await client.get(
                url,
                headers={"xi-api-key": xi_api_key}
            )
            response.raise_for_status()
            data = response.json()
            return {"signedUrl": data["signed_url"]}
            
        except httpx.HTTPError:
            raise HTTPException(status_code=500, detail="Failed to get signed URL")

@app.get("/api/getAgentId")
def get_unsigned_url(model: str = Query("karen")):
    if model == "amanda":
        agent_id = os.getenv("AMANDA_AGENT_ID")
    else:
        agent_id = os.getenv("KAREN_AGENT_ID")
    
    return {"agentId": agent_id}

app.mount("/static", StaticFiles(directory="dist"), name="static")

@app.get("/")
async def serve_root():
    return FileResponse("dist/index.html")