# Diagrams As Code
## Libraries:
- Env managenent with [Poetry](https://python-poetry.org/)
- Diagram as code with [Diagrams](https://diagrams.mingrammer.com/)

## Prequire
Follow [guide](https://diagrams.mingrammer.com/docs/getting-started/installation).

Below are some pre-require:
- graphviz
- poetry

Run commands:
- Install project
    ```bash
    poetry install
    ```
- Generate architects:
    - Portal Django High Level Architect
    ```bash
    poetry run python ./bank_portals/diagrams/portals.py
    ```
     Portal Django High Level Architect - Improvement
    ```bash
    poetry run python ./bank_portals/diagrams/portals_serverless.py
    ```