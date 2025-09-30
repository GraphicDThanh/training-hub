import asyncio
import random

import streamlit as st
from langchain_community.chat_message_histories import StreamlitChatMessageHistory
from langchain_core.messages import ChatMessage
from services.chat import ChatService
from utils import convert_chat_message, get_jwt_token, render_message
from utils.constants import BOT_AVATAR, WELCOME_MESSAGE

expander = st.expander("🚀 Quick Start")
expander.write(
    """
    All users can try the following sample commands:

    💁‍♀️ **Services**:
    - Do you offer free shipping?

    💁‍♀️ **Product Inquiries**
    - Show me the product "SOLAR Stylish V-neck Dress".
    - Compare "Oversize Piece Suits Blazer" with "Kaylin Blazer - Logo Embroidered Blazer".
    - What product categories do you have?
    - Show me 2 products from the "pants" category.

    💁‍♀️ **Support**
    - I need help. Create a support ticket for me.

    ##### 🔓 Log in to unlock personalized features:
    👤 **Profile**
    - Get my profile information.

    👤 **Cart**
    - Add "SOLAR Stylish V-neck Dress" to my cart.
    - Show my cart.
    - Checkout my cart.

    👤 **Orders**
    - Show my order history.
    - Show details for my order with ID <your-order-id>.
    ---

    🎯 **Tips for Better Results**
    - ✅ Use the examples as templates.
    - ✅ Keep your requests short and clear.
    """
)

user_id = st.session_state.user["id"] if st.session_state.user else None

# Initialize event loop - use to stream response customize with human approval
if "loop" not in st.session_state:
    st.session_state.loop = asyncio.new_event_loop()
    asyncio.set_event_loop(st.session_state.loop)


def handle_approve():
    chat_service.approve_tool_call(
        st.session_state.tool_call_id, get_jwt_token(st.session_state)
    )


def handle_reject():
    chat_service.reject_tool_call(
        st.session_state.tool_call_id, get_jwt_token(st.session_state)
    )


async def process_response(response):
    async for content in response:
        if isinstance(content, str):
            response_holder[0] += content
            message_placeholder.markdown(response_holder[0] + "▌")
            continue

        if content.get("require_approval"):
            message = content["message"]
            tool_call_data = content["tool_call_data"]
            st.session_state.tool_call_id = tool_call_data["id"]

            response_holder[0] += message
            message_placeholder.markdown(response_holder[0])

            # Create approve,reject button
            # Create columns for buttons
            col1, col2 = st.columns(2)
            with col1:
                st.button(
                    "Yes",
                    key="approve_button",
                    type="tertiary",
                    icon="✅",
                    use_container_width=True,
                    on_click=handle_approve,
                )
            with col2:
                st.button(
                    "No",
                    key="reject_button",
                    type="tertiary",
                    icon="❌",
                    use_container_width=True,
                    on_click=handle_reject,
                )

            return response_holder[0]
        else:
            response_holder[0] += content.get("content", "")
            message_placeholder.markdown(response_holder[0] + "▌")

    message_placeholder.markdown(response_holder[0])
    if response_holder[0]:
        history.add_message(ChatMessage(role="assistant", content=response_holder[0]))


# Initialize chat service
chat_service = ChatService(
    user_id=user_id,
    thread_id=st.session_state.thread_id,
)

# load history messages from Streamlit session state
history = StreamlitChatMessageHistory(key=f"user_{user_id}_chat_messages")

# Get chat history of thread_id
with st.spinner("Loading..."):
    try:
        messages = chat_service.chat_history()
        history_message_convert = []
        for message in messages:
            message_convert = convert_chat_message(message["type"], message["content"])
            if message_convert:
                history_message_convert.append(message_convert)

        history.messages = history_message_convert
    except Exception:
        pass

# Show history messages to UI
# print("history.messages: ", history.messages)
for msg in history.messages:
    render_message(msg)

# Initialize welcome message
if len(history.messages) == 0:
    random_welcome_message = random.choice(WELCOME_MESSAGE)

    if st.session_state.user:
        user_email = st.session_state.user["email"]
        welcome_message = f"Hi {user_email}, {random_welcome_message}"
    else:
        welcome_message = random_welcome_message

    chat_message = ChatMessage(role="assistant", content=welcome_message)
    render_message(chat_message)
    history.add_message(chat_message)


# Handle user interaction
if prompt := st.chat_input(placeholder="Give me categories list."):
    chat_message = ChatMessage(role="user", content=prompt)
    render_message(chat_message)
    history.add_message(chat_message)

    with st.chat_message("assistant", avatar=BOT_AVATAR):
        message_placeholder = st.empty()
        response_holder = [""]

        with st.spinner("Thinking..."):
            try:
                response = chat_service.chat_stream(
                    prompt, get_jwt_token(st.session_state)
                )

                # Got success response - streaming
                st.session_state.loop.run_until_complete(process_response(response))

                # If not have human approval, stream response is simple
                # st.write_stream(response)

                # With human approval, stream response need to handle manually

                # if response["require_approval"]:
                #     st.button('Approve', on_click=approve_action, args=[1])
                # else:
                #     st.write_stream(response)
            except Exception as e:
                st.error(e)
                st.stop()
