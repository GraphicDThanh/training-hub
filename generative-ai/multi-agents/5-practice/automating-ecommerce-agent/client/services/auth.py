import logging

import httpx
from utils.constants import API_BASE_URL


class AuthService:
    def __init__(
        self, base_url: str = API_BASE_URL, user_id: str = None, thread_id: str = None
    ):
        self.base_url = base_url
        self.user_id = user_id if user_id else "user_1"
        self.thread_id = thread_id if thread_id else "thread_1"

    async def login(self, email: str, password: str) -> dict:
        input = {
            "email": email,
            "password": password,
        }

        async with httpx.AsyncClient() as client:
            response = await client.post(
                self.base_url + "/auth/login", json=input, timeout=30
            )
            response_data = response.json()

            if response.status_code != 200:
                logging.error(
                    f"[Client] Login failed with message: {response_data['message']}"
                )

            return response_data

    async def logout(self) -> dict:
        async with httpx.AsyncClient() as client:
            response = await client.post(
                self.base_url + "/auth/logout", json={}, timeout=30
            )
            if response.status_code != 200:
                raise Exception(
                    "Auth API response not success. Please check the server logs."
                )

            return response.json()
