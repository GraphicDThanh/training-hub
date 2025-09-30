create table "users" (
    "id" uuid not null primary key,
    "first_name" text not null,
    "last_name" text not null,
    "email" text not null,
    "phone" text,
    "auth_user_id" uuid not null,
    "created_at" timestamp default now(),
    "updated_at" timestamp default now()
);

create table "support_tickets" (
    "id" uuid not null primary key,
    "name" text,
    "email" text not null,
    "subject" text not null,
    "phone" text,
    "description" text,
    "user_id" uuid default null references "users" ("id") on delete cascade,
    "status" int not null default 0,
    "created_at" timestamp default now(),
    "updated_at" timestamp default now()
);

create table "shopping_sessions" (
    "id" uuid not null primary key,
    "user_id" uuid not null references "users" ("id") on delete cascade,
    "status" int default 0,
    "created_at" timestamp default now(),
    "updated_at" timestamp default now()
);


create table "shopping_session_items" (
    "id" uuid not null primary key,
    "shopping_session_id" uuid not null references "shopping_sessions" ("id") on delete cascade,
    "product_id" uuid not null,
    "quantity" integer not null,
    "created_at" timestamp default now(),
    "updated_at" timestamp default now()
);

create table "shipping_addresses" (
    "id" uuid not null primary key,
    "user_id" uuid not null references "users" ("id") on delete cascade,
    "address_line_1" text not null,
    "address_line_2" text,
    "city" text not null,
    "postal_code" text not null,
    "state" text not null,
    "country" text not null,
    "is_default" boolean default false,
    "created_at" timestamp default now(),
    "updated_at" timestamp default now()
);


create table "payment_options" (
    "id" uuid not null primary key,
    "name" text not null,
    "category" int not null,
    "provider" int,
    "created_at" timestamp default now(),
    "updated_at" timestamp default now()
);


create table "payment_methods" (
    "id" uuid not null primary key,
    "user_id" uuid not null references "users" ("id") on delete cascade,
    "payment_option_id" uuid not null references "payment_options" ("id") on delete cascade,
    "is_default" boolean default false,
    "created_at" timestamp default now(),
    "updated_at" timestamp default now()
);

create table "orders" (
    "id" uuid not null primary key,
    "user_id" uuid not null references "users" ("id") on delete cascade,
    -- the shopping session id that created the order
    "shopping_session_id" uuid not null references "shopping_sessions" ("id") on delete cascade,
    -- the shipping address that used in the order
    "shipping_address_id" uuid not null references "shipping_addresses" ("id") on delete cascade,
    -- the payment method that used in the order
    "payment_method_id" uuid not null references "payment_methods" ("id") on delete cascade,
    -- order only select shipping options, the shipping carrier will auto selected by system
    "shipping_option_id" uuid not null references "shipping_options" ("id") on delete cascade,
    -- the shipping carrier that used in the order - select from shipping option's shipping carriers
    "shipping_carrier_id" uuid not null references "shipping_carriers" ("id") on delete cascade,
    -- the shipping cost of order calculated by system (save to avoid change in the future)
    "shipping_cost" numeric(10, 2) not null,
    -- total weight of products in the order
    "total_weight_kg" numeric(10, 2) default 0.5,
    "total_cost" numeric(10, 2) not null,
    "status" int default 0,
    "payment_status" int default 0,
    "transaction_id" text,
    "created_at" timestamp default now(),
    "updated_at" timestamp default now()
);

create table "order_items" (
    "id" uuid not null primary key,
    "order_id" uuid not null references "orders" ("id") on delete cascade,
    "product_id" uuid not null references "products" ("id") on delete cascade,
    "product_name" text not null,
    "quantity" integer not null,
    "price_at_purchase" numeric(10, 2) not null,
    "subtotal" numeric(10, 2) not null,
    "created_at" timestamp default now(),
    "updated_at" timestamp default now()
);