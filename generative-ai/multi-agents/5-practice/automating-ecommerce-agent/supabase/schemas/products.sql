create table "products" (
    "id" uuid not null primary key,
    "name" text not null,
    "description" text,
    "price" numeric not null,
    "sizes" text,
    "category_id" uuid null references "categories" ("id") on delete set null,
    "thumbnail" text,
    "url" text,
    "quantity" int not null,
    "weight" numeric default 0.5,
    "created_at" timestamp default now(),
    "updated_at" timestamp default now()
)