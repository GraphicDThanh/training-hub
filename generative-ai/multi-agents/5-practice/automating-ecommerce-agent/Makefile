# CONFIG
.PHONY: load_env
load_env:
	uv run --env-file .env python server/scripts/load_env.py

# APP
.PHONY: run_server
run_server:
	cd server && langchain app serve --port 8080 --app main:app

.PHONY: run_client
run_client:
	cd client && uv run streamlit run app.py

# KNOWLEDGE BASE
.PHONY: create_knowledge_base
create_knowledge_base:
	uv run server/rag/ingest.py

.PHONY: clean_knowledge_base
clean_knowledge_base:
	uv run rm -rf server/db && uv run mkdir server/db

.PHONY: start_db
start_db:
	supabase start

.PHONY: stop_db
stop_db:
	supabase stop

.PHONY: ingest_documents
ingest_documents:
	uv run server/rag/ingest.py --force true

# EVALUATIONS
.PHONY: langsmith_evals
langsmith_evals:
	cd server && uv run evaluations/main.py

# UTIL
.PHONY: login_user
login_user:
	chmod +x ./server/scripts/bash/login_user.sh && ./server/scripts/bash/login_user.sh