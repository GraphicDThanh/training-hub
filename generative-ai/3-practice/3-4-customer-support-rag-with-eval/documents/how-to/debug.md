## How-to Debug
### Debug with VSCode
This way use to debug in python script run directly, like ./src/rag/ingest.py
- Run script with debugger

### Debug with tracer
This debugger is used to debug python code run in promptfoo for example
- Add trace in code:
  - use module:
    ```
    from src.config.debug import debug;debug()
    ```
  - directly:
    ```
    from remote_pdb import RemotePdb
    RemotePdb('127.0.0.1', 4444).set_trace()
    ```
- Access the debugger:
  ```
  telnet 127.0.0.1 4444
  ```
- Check port on use: `lsof -t -i:4444`
- Kill process on port: `kill `lsof -t -i:4444``

### Show more info when run
- Run evaluation with promptfoo:
```
LOG_LEVEL=debug npx promptfoo ...
```
- Run with verbose:
```
npx promptfoo ... --verbose
```

### Clean cache
- Clean cache:
```
npx promptfoo ... --no-cache
```