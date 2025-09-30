## How to use uv
- Create env: `uv venv`
- Activate env: `source .venv/bin/activate`
- Install dependencies: `uv pip install -r pyproject.toml`
- Install package:
  - `uv add <package>`
  - in group: `uv add <package> --group <group>`
- Clean cache: `uv cache clean`