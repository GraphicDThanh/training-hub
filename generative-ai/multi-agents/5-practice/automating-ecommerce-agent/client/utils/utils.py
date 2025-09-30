import logging
import os
from datetime import datetime, timezone

import jwt
from langchain_core.messages import ChatMessage
from streamlit import streamlit as st
from streamlit.runtime.scriptrunner import get_script_run_ctx


def get_session_id():
    return get_script_run_ctx().session_id


def convert_chat_message(message_type, content):
    # print("message_type: ", message_type)
    # print("content: ", content)
    match message_type:
        case "human":
            return ChatMessage(role="user", content=content)
        case "ai":
            return ChatMessage(role="assistant", content=content)
        # case _:
        #     return ChatMessage(role="unknown", content=content)


def get_chat_message_avatar(msg):
    if not msg:
        return "🤔"

    match msg.role:
        case "user":
            return "👤"
        case "assistant":
            return "🤖"
        case _:
            return "🤔"


def render_message(msg):
    # FIX ME: circle import
    from .constants import BOT_AVATAR, USER_AVATAR

    if not msg or msg.role not in ["user", "assistant"] or not msg.content:
        return

    if msg.role == "user":
        avatar = USER_AVATAR
    else:
        avatar = BOT_AVATAR

    message = st.chat_message(msg.role, avatar=avatar)
    message.markdown(msg.content)


def has_user():
    if "user" not in st.session_state or not st.session_state.user:
        return False

    if "user_session" not in st.session_state or not st.session_state.user_session:
        return False

    user_session = st.session_state.user_session
    if not user_session["access_token"]:
        return False

    # Check expires_at
    expires_at = user_session["expires_at"]

    # Convert expires_at to a datetime object if it's an integer (Unix timestamp)
    if isinstance(expires_at, int):
        expires_at = datetime.fromtimestamp(expires_at, tz=timezone.utc)

    if not expires_at or expires_at < datetime.now(timezone.utc):
        return False

    # Verify JWT token
    try:
        decoded_token = jwt.decode(
            user_session["access_token"],
            options={"verify_signature": False},
            algorithms=["HS256"],  # Common algorithm, adjust if needed
        )

        # Check if token is expired based on 'exp' claim
        if "exp" in decoded_token:
            expiration = datetime.fromtimestamp(decoded_token["exp"], tz=timezone.utc)
            if datetime.now(timezone.utc) >= expiration:
                return False

    except jwt.PyJWTError:
        # Invalid token format
        return False

    return True


def get_jwt_token(session_state):
    if "user_session" not in session_state or not session_state.user_session:
        return ""

    user_session = session_state.user_session
    if not user_session["access_token"]:
        return ""

    # Check expires_at
    expires_at = user_session["expires_at"]

    # Convert expires_at to a datetime object if it's an integer (Unix timestamp)
    if isinstance(expires_at, int):
        expires_at = datetime.fromtimestamp(expires_at, tz=timezone.utc)

    if not expires_at or expires_at < datetime.now(timezone.utc):
        return ""

    return user_session["access_token"]


# -- Chore utils -- #
def get_int_env(var_name, default):
    try:
        return int(os.getenv(var_name, default))
    except (TypeError, ValueError):
        logging.error(
            f"Invalid {var_name} value in .env file. Using default value of {default}."
        )
        return default


REQUEST_TIMEOUT = get_int_env("REQUEST_TIMEOUT", 60)
