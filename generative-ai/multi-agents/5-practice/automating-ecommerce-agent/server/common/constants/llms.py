from common.llms import chat_model, embedding_model

TEAMMATE_MODEL = chat_model.default_model
# SUPERVISOR_MODEL = chat_model.default_model

# 4.1-mini is better reasoning than 4o-mini
SUPERVISOR_MODEL = chat_model.gpt_4_1_mini
EMBEDDING_MODEL = embedding_model.default_model
