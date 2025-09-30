
## Timeline:
- 5 days (June 14, 17, 18, 19, 20)

## Planning:
- Day 1: Analysis + tech solution + planning
- Day 2: Setup Aspire with current app
- Day 3: Caching with "Redis" container
- Day 4: Simple UI React App (or reuse Blazor app eShopLite)
- Day 5: Integration test with Aspire host

## Detail plan:

### Day 1:
- Understand requirements
- Checkout if anyone done this kind of tech before + read aspire examples
- List out all tasks need to do
- Research task not clear, discuss solution with supporter
- Make plan working + eta

### Day 2: Setup Aspire with tech stack

### Day 3: Caching with "Redis" container

### Day 5: Integration test with Aspire host

## Analysis
- Tech stack
    - Aspire
    - PostgreSQL
    - API Controllers
    - Blazor webapp (eShopLite)
    - Redis cache

## Tasks
- **Task 1**: Design Aspire project include projects:
    - Apphost (Aspire orchestrator)
    - DefaultServices (Aspire default services)
    - Api (controllers, etc.)
    - Application (services, etc.)
    - DataAccess (repositories, db context, etc.)
    - Common (constants, entities, DTOs, etc.)
    - MigrationService (worker migrate database)
    - WebApp (Blazor webapp)
    - AspireStore.sln

- **Task 2**: Setup Aspire project
    - Set up all above projects
    - Run Aspire up work include:
        - See dashboard with resource
        - Able to run web app
        - Able to run API
        - Able to show data from API to web app

- **Task 3**