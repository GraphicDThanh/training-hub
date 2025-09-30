import asyncio

import streamlit as st
from services.auth import AuthService
from st_pages import add_page_title, get_nav_from_toml
from utils import get_session_id, has_user
from utils.apis import health_check

auth_service = AuthService()


if "user" not in st.session_state:
    st.session_state.user = None

if "user_session" not in st.session_state:
    st.session_state.user_session = None

# Initialize user_id and thread_id

# Initialize event loop
if "loop" not in st.session_state:
    st.session_state.loop = asyncio.new_event_loop()
    asyncio.set_event_loop(st.session_state.loop)


def handle_login(email, password):
    response_data = asyncio.run(auth_service.login(email, password))
    if response_data["status"] == "success":
        response_data = response_data["data"]
        st.session_state.user = response_data["user"]
        st.session_state.user_session = response_data["session"]
        st.rerun()
    else:
        error_message = response_data.get("message", "Unknown error")
        st.error(f"Login failed with error: {error_message}")


def handle_logout():
    asyncio.run(auth_service.logout())
    st.session_state.user = None
    st.session_state.user_session = None
    st.success("Logged out successfully!")


with st.sidebar:
    st.markdown(
        """
        Hi there! 👋

        I'm here to assist you with all your shopping needs on ecommerce platform!
        """
    )
    if has_user() is False:
        with st.form("login_form"):
            email = st.text_input("Email")
            password = st.text_input("Password", type="password")
            submit = st.form_submit_button("Login")
            if submit:
                handle_login(email, password)

        st.markdown(
            """
            Anonymous user only able to:
            - ❔ Ask service questions
            - 🛍️ Browse products
            - 📦 Create support tickets

            Logged in user able to use our powerful features:
            - 💬 Chat history
            - 🛒 Shopping cart
            - 📦 View and manage your orders
            """
        )
        st.divider()
    else:
        st.markdown(
            f"""
            Logged in as **{st.session_state.user["email"]}**.
            """
        )

        st.markdown(
            """
            You can use our powerful features:
            - ❔ Ask service questions
            - 🛍️ Browse products
            - 📦 Create support tickets
            - 💬 Chat history
            - 🛒 Shopping cart
            - 📦 View and manage your orders
            """
        )
        st.button(
            "Logout",
            type="secondary",
            icon="🔒",
            use_container_width=True,
            on_click=handle_logout,
        )

    # Set thread id and load history (if any)
    input_thread_id = st.text_input(
        "Input Your Thread ID To Continue the Conversation:"
    )
    st.session_state.thread_id = input_thread_id or get_session_id()

    st.markdown(
        f"Current Thread ID:\n **{st.session_state.thread_id}**",
        help="We will support to load session and history with this ID in the future.",
    )
    st.divider()
    st.markdown(
        """
        Contact us via:
        - 📧 hi@ecommerce.com
        - 📞 0905 89 86 83
        - 🕔 Monday to Saturday (8:00 AM to 5:30 PM)
        """
    )

nav = get_nav_from_toml(".streamlit/pages.toml")
pg = st.navigation(nav)
add_page_title(pg)
pg.run()

# Check server healthy
health_check()
