> [UPDATE] Practice move to use Supabase Project in Cloud.

# Supabase Local Development
Supabase is an open-source Firebase alternative that provides a suite of tools for building applications. It offers a PostgreSQL database, authentication, real-time subscriptions, and storage, all accessible via a RESTful API.

## [Run Supabase for local development](https://supabase.com/docs/guides/local-development)
- Run Docker desktop
- Start supabase local development server
```bash
supabase start
```
- View local Supabase studio at `http://localhost:54323/`

## [Seeding your database](https://supabase.com/docs/guides/local-development/seeding-your-database)
- Generate `*.sql` file to `seeds/` folder
As the data I crawl from website ivymode.com (another project) to a json file and copy it content to here,
This command will help to generate SQL query from json file, which support by Supabase for seeding data.
```bash
uv run server/scripts/gen_seed_sql.py
```
- Seed data to local database
```bash
supabase db reset
```

## [Migration](https://supabase.com/docs/guides/local-development/declarative-database-schemas)
### Create a new schema
- Create new schema in `supabase/schemas/*.sql`
- Stop the local db server (if running)
```bash
supabase stop
```
- Run update migration with a `migration_name`
```bash
supabase db diff -f <migration_name>
```
- Start the local db again to update the database schemas update
```bash
supabase start
```

### Update a schema
- Update existing schema in `schemas/`
- Make sure to stop the local db running before run update migration
```bash
supabase stop
```
- Generate migration
```bash
supabase db diff -f <migration_name>
```
- Apply pending migration
```bash
supabase start && supabase migration up
```

### Reset the database
- `supabase db reset`
  - this will clean up all auth.users
  - need to update uuid of auth.users in public.users when reset

### Other
- Schema of relations need in order. For example:
  - `shopping_sessions` of user need go after `users`
  - `shopping_session_items` of `shopping_sessions` need go after `shopping_sessions`
- Authentication with Supabase
  - `Add user` via http://127.0.0.1:54323/project/default/auth/users
  - Get the `UID` value then update it to user record in `public.users`, field `auth_user_id`
  - With this setup, user can login to system via Supabase `auth.users` table.