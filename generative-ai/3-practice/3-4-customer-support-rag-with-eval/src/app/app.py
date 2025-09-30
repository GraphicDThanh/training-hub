import streamlit as st
from langchain.schema import ChatMessage
from langchain_core.output_parsers import StrOutputParser

from src.callbacks.callback_handler import StreamHandler
from src.chains.prompt_chain import main as init_prompt
from src.llms.chat_model import main as get_chat_model
st.set_page_config(
    page_title="Customer Support Agent",
    page_icon="🛍️",
    layout="centered",
    initial_sidebar_state="auto"
)

st.title("🛍️ Flipkart Customer Agent")

with st.sidebar:
    """
    Hi there! 👋

    I'm here to assist you with all your shopping needs on IVY Moda!

    IVY Moda is a leading Vietnamese fashion brand offering trendy, high-quality clothing for men, women, and children, including casual, office, and evening wear. Known for its contemporary designs and affordability, the brand operates nationwide stores and provides convenient online shopping 👕👚.

    Here’s how you can use this chat:

    1️⃣ Get Help with Services:
    - xxx

    2️⃣ Inquire About Products:
    - xxx

    3️⃣ Find FAQs Quickly:
    - How can I change the delivery address for my order?
    - Do you offer free shipping?

    ---

    🎯 Tip:
    - Use example to get started easily.
    - Be as short and specific as possible.

    Let’s get started! 🛍️

    📧 Contact us via email at cskh@ivy.com.vn or call 0905 89 86 83 (Monday to Saturday, 8:00 AM to 5:30 PM).
    """

def main():
    # Display chat message initial state
    if "messages" not in st.session_state:
        st.session_state.messages = [
            ChatMessage(role="assistant", content="How can I help you?")
        ]

    # Display chat messages from the session state
    for msg in st.session_state.messages:
        with st.chat_message(msg.role):
            st.markdown(msg.content)

    # Chat input
    if user_input := st.chat_input("How can I help you?"):
        # Append user message to the session state
        st.session_state.messages.append(
            ChatMessage(role="user", content=user_input)
        )

        # Show the user message in the chat
        with st.chat_message("user"):
            st.markdown(user_input)

        # Chat response from the assistant
        with st.chat_message("assistant"):
            message_placeholder = st.empty()

            llm_model = get_chat_model(
                streaming=True,
                callbacks=[StreamHandler(message_placeholder)]
            )
            prompt = init_prompt()
            rag_chain = prompt | llm_model | StrOutputParser()
            response = rag_chain.invoke(user_input)

            st.session_state.messages.append(
                ChatMessage(
                    role="assistant",
                    content=response
                )
            )


if __name__ == "__main__":
    main()
