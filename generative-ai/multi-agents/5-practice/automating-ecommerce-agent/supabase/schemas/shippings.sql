create table "shipping_options" (
    "id" uuid not null primary key,
    "name" text not null,
    "description" text,
    "base_price" numeric(10, 2) not null,
    "created_at" timestamp default now(),
    "updated_at" timestamp default now()
);

create table "shipping_carriers" (
    "id" uuid not null primary key,
    "name" text not null,
    "description" text,
    "created_at" timestamp default now(),
    "updated_at" timestamp default now()
);

-- Join table for many-to-many relationship
create table "shipping_option_carriers" (
    "shipping_option_id" uuid not null references "shipping_options"("id") on delete cascade,
    "shipping_carrier_id" uuid not null references "shipping_carriers"("id") on delete cascade,
    primary key ("shipping_option_id", "shipping_carrier_id")
);