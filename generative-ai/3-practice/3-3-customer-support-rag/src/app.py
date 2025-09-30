import streamlit as st
from langchain.schema import ChatMessage
from callbacks.callback_handler import StreamHandler
from models.openai_model import OpenAIChatModel
from rag.chains.chain import init_rag_chain
from rag.retrievers.retriever import create as create_retriever

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

    I'm here to assist you with all your shopping needs on [Flipkart](https://www.flipkart.com/)

    "Clothing and Accessories" 👕👚.

    Here's how you can use this chat:

    1️⃣ Get Help with Services:
    - What are the "Order Steps"?
    - What are "Payment Methods" support?
    - Give me return policy of category "Tracksuits"

    - What are "Shipping Options"?
    - Give me list of "Shipping Carriers"

    2️⃣ Inquire About Products:
    - List out all "Product Categories"
    - How much "Metal Adjuster Cap"?

    3️⃣ Find FAQs Quickly:
    - Do you offer free shipping?
    - Can I use a corporate email ID to sign up?

    ---

    🎯 Tip: Be as specific as possible to get the best help fast!

    💡 Note: I’m here 24/7 to assist you.

    Let's get started! 🛍️

    Contact the support team via email at support@flipkart.com or call 1800-123-4567.
    """

def main():
    # Initialize the RAG components
    try:
        retriever = create_retriever()
    except Exception as e:
        st.error(f"Init RAG components fail with error: {e}")
        return

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

            openai_chat_model = OpenAIChatModel(
                streaming=True,
                callbacks=[StreamHandler(message_placeholder)]
            )
            try:
                rag_chain = init_rag_chain(
                    openai_chat_model.client, retriever
                )
                response = rag_chain.invoke(user_input)
                st.session_state.messages.append(
                    ChatMessage(
                        role="assistant",
                        content=response
                    )
                )
            except Exception as e:
                st.error(f"Agent fail with error: {e}")
                return





if __name__ == "__main__":
    main()
