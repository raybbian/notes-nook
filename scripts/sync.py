from datetime import datetime

import httpx
import os
import json

BASE_URL = "https://graph.microsoft.com/v1.0/me/drive/root:/Notes"


class Sync:
    def __init__(self):
        self.access_token = self.get_access_token()
        self.headers = {'Authorization': f'Bearer {self.access_token}'}

    @staticmethod
    def get_access_token():
        url = 'https://login.microsoftonline.com/common/oauth2/v2.0/token'
        refresh_token = os.environ["REFRESH_TOKEN"]
        client_id = os.environ["CLIENT_ID"]
        client_secret = os.environ["CLIENT_SECRET"]

        payload = {
            'client_id': client_id,
            'client_secret': client_secret,
            'refresh_token': refresh_token,
            'scope': 'files.read',
            'grant_type': 'refresh_token',
            'redirect_uri': 'https://raybb.dev'
        }

        with httpx.Client() as client:
            response = client.post(url, data=payload)
            return json.loads(response.content)["access_token"]

    async def get_notes(self):
        with open(f"../notes/timestamp.txt", "w") as f:
            f.write(str(datetime.now()))
        await self.get_recursively('')

    async def get_recursively(self, rel_url):
        url = f"{BASE_URL}{rel_url}:/children"
        if rel_url == "/scripts":
            return
        print(f"Scanning contents of folder {rel_url}")
        async with httpx.AsyncClient() as client:
            response = await client.get(url, headers=self.headers, follow_redirects=True)
            if response.status_code != 200:
                raise Exception("Failed to get notes.")
            children = json.loads(response.content)["value"]
            for item in children:
                if "folder" in item:
                    await self.get_recursively(f"{rel_url}/{item['name']}")
                else:
                    print(f"Writing file {rel_url}/{item['name']}")
                    content_url = f'{BASE_URL}{rel_url}/{item["name"]}:/content'
                    content = await client.get(content_url, headers=self.headers, follow_redirects=True)
                    os.makedirs(f'../notes/{rel_url}', exist_ok=True)
                    with open(f"../notes/{rel_url}/{item['name']}", "wb") as f:
                        f.write(content.content)

