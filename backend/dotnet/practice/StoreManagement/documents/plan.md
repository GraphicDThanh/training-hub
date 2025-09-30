
# .NET Practice Plan (6 weeks)
> Resource: 1 developer (Thanh Nguyen)

## Practice Phases
### Phase 0: Analysis, Init Project
- Feature:
    - Analysis requirements
    - Learn techstack
    - Design ERD, APIs
    - Project architect & Code structure
- Output:
    - ERD diagrams
    - Architect diagrams
    - API design doc
    - Code structure
    - Full example flow
    - Configuration:
        - API doc with Swashbuckle
        - unit test XUnit & MOQ
        - .Net Analyzer
- Timeline:
    - [x] Day 1 - Apr 10th: Analysis requirements
    - [x] Day 2 - Apr 11th: Learn techstack
    - [x] Day 3 - Apr 12th: App architect & code structure
    - [x] Day 4 - Apr 16th: App example flow
    - [x] Day 5 - Apr 17th: APIs design
    - [x] Day 6: Configuration
        - mapping with Auto Mapper
        - Test api with .http files
        - FluentValidation for Model validations
    - Day 7:
        - unit test with XUnit & MOQ
        - Setup Integration Test
        - Setup Serilog
        - Source code analysis using .NET Analyzer
        - Custom middleware to show the request and response with the timeline


### Phase 1: Authentication, Product management
- Features:
    - User can:
        - Register/Login by email/pass
        - Get all products
    - Admin can:
        - Login
        - Product management
            - Get all products
            - Create product
            - Update product
            - Delete product
- Output:
    - [APIs](https://docs.google.com/document/d/16Kpywwh32hiT98sQPJSieWHc-EHHWtm66AqJhh1ODm0)
        - Authentication:
            - `POST api/register/`
            - `POST api/login/`
        - Product Management:
            - `GET api/products/`
            - `POST api/products/`
            - `GET api/products/id/`
            - `DELETE products/id/`
    - Testing
- Timeline:
    - Day 8 - Apr 19th: Register, Login (Identity Framework)
    - Day 9 - Apr 22th: Product Management


### Phase 2: Cart, Order management
- Features:
    - User can:
        - Get all products (support Pagination, Filter, Order)
        - Add/Delete products in his/her carts
        - Buy all products on carts (cash on delivery)
        - Get the purchase history
    - Admin can:
        - Get all products (support Pagination, Filter, Order)

- Output:
    - [APIs](https://docs.google.com/document/d/16Kpywwh32hiT98sQPJSieWHc-EHHWtm66AqJhh1ODm0)
        - Cart:
            - `POST shopping-session/add/`
            - `POST shopping-session/remove/`
            - `POST shopping-session/update/`
            - `POST shopping-session/checkout/`
            - `POST shopping-session/empty/`
        - Order:
            - `GET api/orders/`
    - Testing
- Timeline:
    - Day 10 - Apr 23th: Cart action
    - Day 11 - Apr 24th: Order
    - Day 12 - Apr 25th: Unit test

### Phase 3: User management
- Features:
    - Admin can:
        - User management (CRUD)
            - Get all users with
                - Pagination
                - Filter
                - Order
        - Set role for a user
    - The user will receive an email notification (text only) after the order (optional)
- Output:
    - [APIs](https://docs.google.com/document/d/16Kpywwh32hiT98sQPJSieWHc-EHHWtm66AqJhh1ODm0)
        - User
            - `POST api/users/`
            - `POST api/users/set-role`
            - `GET api/users/`
            - `GET api/users/id`
            - `PATCH api/users/id`
            - `DELETE users/id/`
- Timeline:
    - Day 13 - Apr 23th: User management
    - Day 14 - Apr 24th: Setup up EF Core with database
    - Day 15 - Apr 25th: Pagination
    - Day 16 - Apr 26th: Filter, Order

Requirements not include:
- Database: SQL Server (Windows) run in container
- Caching
- API versioning (if possible)
- Identity Framework https://learn.microsoft.com/en-us/aspnet/Domain/security/authentication/identity-api-authorization

Open questions:
- Compare AutoMapper and Mapster?
- How to solve sensitive data in connect string of integration testing app?

### Phase 4: Extended - 4 days
Today is May 20th, 2024. I write this note to summarize the process of this practice.
- Feature done:
    - Analysis requirements
    - Learn about techstack
    - Init code skeleton follow N-Layer architecture
    - Init code with EF Core (data access layer, unit of work, generic repository pattern)
    - Config:
        - database SQL server
        - unit testing with XUnit, MoQ
        - API doc with Swashbuckle
        - .NET Analyzer
        - Serilog
    - Docker (has issue)
    - Authentication (Identity Framework)
    - Assign Role
    - APIs products
    - Error handling

- Remaining:
    - APIs shopping session and order
    - Unit testing
    - Integration testing
    - Send email (opt)

For the remaining, I re-estimate my work in 4 days.
So, I would like to request to extend my timeline to work on this practice to Friday, May 24th, 2024.

### Phase 5: Extended - 3 days
Today is May 27th, 2024. I write this note to summarize the process of this practice.
Basically done practice with remaining:
- Issues:
  - How to register user with default role is User? (as current use identity api endpoints)
  - Get user (include cart id current)
  - Get cart (cart items has product id id null)
- Features:
  - Get orders
  - Send email after order
  - Caching
  - Unit testing
  - Integration testing
  - Fill requests folder doc
  - API versioning
- Refactor:
  - Custom middleware (clean up with permission on current user login)
    - Only login user or admin could access their account
    - Only login user or admin could access/update/checkout their cart
    - Create cart dont need `user` in request data, could get from context

For the remaining, I re-estimate my work in 3 days.
So, I would like to request to extend my timeline to work on this practice to Wed, May 29th, 2024.
If not have any other plan, I would like to continue these optional things to finish my course.
Pls consider.
