create table "categories" (
    "id" uuid not null primary key,
    "name" text not null,
    "description" text,
    "created_at" timestamp default now(),
    "updated_at" timestamp default now()
);