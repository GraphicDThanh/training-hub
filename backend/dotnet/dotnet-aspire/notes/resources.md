## Plan training official
- [Official training plan](https://docs.google.com/document/d/1pvvqMPBt-Zq6sagxd5GnqHbl42iDxWOqquLBbjLAK28/edit?usp=sharing)
    - [Official .NET Aspire Document](https://learn.microsoft.com/en-us/dotnet/aspire/get-started/aspire-overview)
        - .NET Aspire overview
        - Setup and tooling
        - What’s new in .NET Aspire
    - [App Host (Orchestration)](https://learn.microsoft.com/en-us/dotnet/aspire/fundamentals/app-host-overview?tabs=docker)
        - Overview
        - Use external parameters
        - Persist data using volumes
        - Create custom resource types
    - [Dashboard](https://learn.microsoft.com/en-us/dotnet/aspire/fundamentals/dashboard/overview?tabs=bash)
        - Overview
        - Explore features
        - Standalone mode
        - Configuration
        - Security considerations
    - [Fundamentals](https://learn.microsoft.com/en-us/dotnet/aspire/fundamentals/networking-overview)
        - Networking overview
        - Service discovery
        - Testing .NET Aspire Apps
        - Service defaults
        - Telemetry
    - [Components](https://learn.microsoft.com/en-us/dotnet/aspire/fundamentals/components-overview?tabs=dotnet-cli)
        - Overview
        - Tutorials

## PRACTICE (1 week)
- Upgrade your .NET practice to use Aspire. It should contain:
    - API project
    - Database (PostgreSQL or SQLServer). Data should be persisted.
    - Caching (Redis container)
    - Simple UI (Can be Blazor or Node-based framework such as Angular, React…)
    - Integration test with Aspire host
    - Database migration

## Videos:
- dotnet
    - Series [Welcome to .NET Aspire!](https://www.youtube.com/watch?v=UYH97nPLWrM&list=PLdo4fOcmZ0oUfIayQMrRqaSL55Rkck-GD) (10 videos)

## Source code:
-  [aspire-samples](https://github.com/dotnet/aspire-samples)