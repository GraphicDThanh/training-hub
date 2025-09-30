## LangChain - Functions, Tools and Agents with LangChain

### Setup
- Create a virtual environment: `uv venv`
- `uv pip install -r pyproject.toml`

### Debug:
- Add trace:
```
from remote_pdb import RemotePdb
RemotePdb('127.0.0.1', 4444).set_trace()
```
- Access debugger:
```
telnet 127.0.0.1 4444
```