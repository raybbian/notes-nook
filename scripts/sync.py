import httpx
import os
import json

BASE_URL = "https://graph.microsoft.com/v1.0/me/drive/root:/Notes"
SEMESTER_DIR = "/bachelor-1/semester-1"


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

    async def get_course_names(self):
        url = BASE_URL + SEMESTER_DIR + ":/children"
        async with httpx.AsyncClient() as client:
            response = await client.get(url, headers=self.headers)
            if response.status_code != 200:
                raise Exception("Failed to get courses.")
            out = []
            for item in json.loads(response.content)["value"]:
                if "folder" in item:
                    out.append(item["name"])
            return out

    async def get_note_names(self, course_name):
        url = BASE_URL + SEMESTER_DIR + f"/{course_name}:/children"
        async with httpx.AsyncClient() as client:
            response = await client.get(url, headers=self.headers)
            if response.status_code != 200:
                raise Exception(f"Failed to get f{course_name} notes.")
            out = []
            for item in json.loads(response.content)["value"]:
                if "file" in item and "lec_" in item["name"]:
                    out.append(item["name"])
            return out

    async def get_note_content(self, course_name, note_name):
        url = BASE_URL + SEMESTER_DIR + f"/{course_name}/{note_name}:/content"
        async with httpx.AsyncClient() as client:
            response = await client.get(url, headers=self.headers)
            if response.status_code == 302:
                response = await client.get(response.headers['location'])
            elif response.status_code != 200:
                raise Exception(f"Failed to get {note_name} from {course_name}.")
            return response.text

    async def save_notes_to_json(self):
        courses = await self.get_course_names()
        out = {}
        for course_name in courses:
            out[course_name] = {}
            note_names = await self.get_note_names(course_name)
            for note_name in note_names:
                note_content = await self.get_note_content(course_name, note_name)
                out[course_name][note_name] = note_content

        with open('notes.json', 'w') as file:
            json.dump(out, file, indent=4)
