create table "public"."categories" (
    "id" uuid not null,
    "name" text not null,
    "description" text,
    "created_at" timestamp without time zone default now(),
    "updated_at" timestamp without time zone default now()
);


create table "public"."order_items" (
    "id" uuid not null,
    "order_id" uuid not null,
    "product_id" uuid not null,
    "product_name" text not null,
    "quantity" integer not null,
    "price_at_purchase" numeric(10,2) not null,
    "subtotal" numeric(10,2) not null,
    "created_at" timestamp without time zone default now(),
    "updated_at" timestamp without time zone default now()
);


create table "public"."orders" (
    "id" uuid not null,
    "user_id" uuid not null,
    "shopping_session_id" uuid not null,
    "shipping_address_id" uuid not null,
    "payment_method_id" uuid not null,
    "status" integer default 0,
    "shipping_cost" numeric(10,2) not null,
    "payment_status" integer default 0,
    "transaction_id" text,
    "created_at" timestamp without time zone default now(),
    "updated_at" timestamp without time zone default now()
);


create table "public"."payment_methods" (
    "id" uuid not null,
    "user_id" uuid not null,
    "payment_option_id" uuid not null,
    "is_default" boolean default false,
    "created_at" timestamp without time zone default now(),
    "updated_at" timestamp without time zone default now()
);


create table "public"."payment_options" (
    "id" uuid not null,
    "name" text not null,
    "category" integer not null,
    "provider" integer,
    "created_at" timestamp without time zone default now(),
    "updated_at" timestamp without time zone default now()
);


create table "public"."products" (
    "id" uuid not null,
    "name" text not null,
    "description" text,
    "price" numeric not null,
    "sizes" text,
    "category_id" uuid,
    "thumbnail" text,
    "url" text,
    "quantity" integer not null,
    "created_at" timestamp without time zone default now(),
    "updated_at" timestamp without time zone default now()
);


create table "public"."shipping_addresses" (
    "id" uuid not null,
    "user_id" uuid not null,
    "address_line_1" text not null,
    "address_line_2" text,
    "city" text not null,
    "postal_code" text not null,
    "state" text not null,
    "country" text not null,
    "is_default" boolean default false,
    "created_at" timestamp without time zone default now(),
    "updated_at" timestamp without time zone default now()
);


create table "public"."shopping_session_items" (
    "id" uuid not null,
    "shopping_session_id" uuid not null,
    "product_id" uuid not null,
    "quantity" integer not null,
    "created_at" timestamp without time zone default now(),
    "updated_at" timestamp without time zone default now()
);


create table "public"."shopping_sessions" (
    "id" uuid not null,
    "user_id" uuid not null,
    "status" integer default 0,
    "created_at" timestamp without time zone default now(),
    "updated_at" timestamp without time zone default now()
);


create table "public"."support_tickets" (
    "id" uuid not null,
    "name" text,
    "email" text not null,
    "subject" text not null,
    "phone" text,
    "description" text,
    "status" integer not null default 0,
    "created_at" timestamp without time zone default now(),
    "updated_at" timestamp without time zone default now()
);


create table "public"."users" (
    "id" uuid not null,
    "first_name" text not null,
    "last_name" text not null,
    "email" text not null,
    "phone" text,
    "auth_user_id" uuid not null,
    "created_at" timestamp without time zone default now(),
    "updated_at" timestamp without time zone default now()
);


CREATE UNIQUE INDEX categories_pkey ON public.categories USING btree (id);

CREATE UNIQUE INDEX order_items_pkey ON public.order_items USING btree (id);

CREATE UNIQUE INDEX orders_pkey ON public.orders USING btree (id);

CREATE UNIQUE INDEX payment_methods_pkey ON public.payment_methods USING btree (id);

CREATE UNIQUE INDEX payment_options_pkey ON public.payment_options USING btree (id);

CREATE UNIQUE INDEX products_pkey ON public.products USING btree (id);

CREATE UNIQUE INDEX shipping_addresses_pkey ON public.shipping_addresses USING btree (id);

CREATE UNIQUE INDEX shopping_session_items_pkey ON public.shopping_session_items USING btree (id);

CREATE UNIQUE INDEX shopping_sessions_pkey ON public.shopping_sessions USING btree (id);

CREATE UNIQUE INDEX support_tickets_pkey ON public.support_tickets USING btree (id);

CREATE UNIQUE INDEX users_pkey ON public.users USING btree (id);

alter table "public"."categories" add constraint "categories_pkey" PRIMARY KEY using index "categories_pkey";

alter table "public"."order_items" add constraint "order_items_pkey" PRIMARY KEY using index "order_items_pkey";

alter table "public"."orders" add constraint "orders_pkey" PRIMARY KEY using index "orders_pkey";

alter table "public"."payment_methods" add constraint "payment_methods_pkey" PRIMARY KEY using index "payment_methods_pkey";

alter table "public"."payment_options" add constraint "payment_options_pkey" PRIMARY KEY using index "payment_options_pkey";

alter table "public"."products" add constraint "products_pkey" PRIMARY KEY using index "products_pkey";

alter table "public"."shipping_addresses" add constraint "shipping_addresses_pkey" PRIMARY KEY using index "shipping_addresses_pkey";

alter table "public"."shopping_session_items" add constraint "shopping_session_items_pkey" PRIMARY KEY using index "shopping_session_items_pkey";

alter table "public"."shopping_sessions" add constraint "shopping_sessions_pkey" PRIMARY KEY using index "shopping_sessions_pkey";

alter table "public"."support_tickets" add constraint "support_tickets_pkey" PRIMARY KEY using index "support_tickets_pkey";

alter table "public"."users" add constraint "users_pkey" PRIMARY KEY using index "users_pkey";

alter table "public"."order_items" add constraint "order_items_order_id_fkey" FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE not valid;

alter table "public"."order_items" validate constraint "order_items_order_id_fkey";

alter table "public"."order_items" add constraint "order_items_product_id_fkey" FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE not valid;

alter table "public"."order_items" validate constraint "order_items_product_id_fkey";

alter table "public"."orders" add constraint "orders_payment_method_id_fkey" FOREIGN KEY (payment_method_id) REFERENCES payment_methods(id) ON DELETE CASCADE not valid;

alter table "public"."orders" validate constraint "orders_payment_method_id_fkey";

alter table "public"."orders" add constraint "orders_shipping_address_id_fkey" FOREIGN KEY (shipping_address_id) REFERENCES shipping_addresses(id) ON DELETE CASCADE not valid;

alter table "public"."orders" validate constraint "orders_shipping_address_id_fkey";

alter table "public"."orders" add constraint "orders_shopping_session_id_fkey" FOREIGN KEY (shopping_session_id) REFERENCES shopping_sessions(id) ON DELETE CASCADE not valid;

alter table "public"."orders" validate constraint "orders_shopping_session_id_fkey";

alter table "public"."orders" add constraint "orders_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE not valid;

alter table "public"."orders" validate constraint "orders_user_id_fkey";

alter table "public"."payment_methods" add constraint "payment_methods_payment_option_id_fkey" FOREIGN KEY (payment_option_id) REFERENCES payment_options(id) ON DELETE CASCADE not valid;

alter table "public"."payment_methods" validate constraint "payment_methods_payment_option_id_fkey";

alter table "public"."payment_methods" add constraint "payment_methods_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE not valid;

alter table "public"."payment_methods" validate constraint "payment_methods_user_id_fkey";

alter table "public"."products" add constraint "products_category_id_fkey" FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL not valid;

alter table "public"."products" validate constraint "products_category_id_fkey";

alter table "public"."shipping_addresses" add constraint "shipping_addresses_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE not valid;

alter table "public"."shipping_addresses" validate constraint "shipping_addresses_user_id_fkey";

alter table "public"."shopping_session_items" add constraint "shopping_session_items_shopping_session_id_fkey" FOREIGN KEY (shopping_session_id) REFERENCES shopping_sessions(id) ON DELETE CASCADE not valid;

alter table "public"."shopping_session_items" validate constraint "shopping_session_items_shopping_session_id_fkey";

alter table "public"."shopping_sessions" add constraint "shopping_sessions_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE not valid;

alter table "public"."shopping_sessions" validate constraint "shopping_sessions_user_id_fkey";

grant delete on table "public"."categories" to "anon";

grant insert on table "public"."categories" to "anon";

grant references on table "public"."categories" to "anon";

grant select on table "public"."categories" to "anon";

grant trigger on table "public"."categories" to "anon";

grant truncate on table "public"."categories" to "anon";

grant update on table "public"."categories" to "anon";

grant delete on table "public"."categories" to "authenticated";

grant insert on table "public"."categories" to "authenticated";

grant references on table "public"."categories" to "authenticated";

grant select on table "public"."categories" to "authenticated";

grant trigger on table "public"."categories" to "authenticated";

grant truncate on table "public"."categories" to "authenticated";

grant update on table "public"."categories" to "authenticated";

grant delete on table "public"."categories" to "service_role";

grant insert on table "public"."categories" to "service_role";

grant references on table "public"."categories" to "service_role";

grant select on table "public"."categories" to "service_role";

grant trigger on table "public"."categories" to "service_role";

grant truncate on table "public"."categories" to "service_role";

grant update on table "public"."categories" to "service_role";

grant delete on table "public"."order_items" to "anon";

grant insert on table "public"."order_items" to "anon";

grant references on table "public"."order_items" to "anon";

grant select on table "public"."order_items" to "anon";

grant trigger on table "public"."order_items" to "anon";

grant truncate on table "public"."order_items" to "anon";

grant update on table "public"."order_items" to "anon";

grant delete on table "public"."order_items" to "authenticated";

grant insert on table "public"."order_items" to "authenticated";

grant references on table "public"."order_items" to "authenticated";

grant select on table "public"."order_items" to "authenticated";

grant trigger on table "public"."order_items" to "authenticated";

grant truncate on table "public"."order_items" to "authenticated";

grant update on table "public"."order_items" to "authenticated";

grant delete on table "public"."order_items" to "service_role";

grant insert on table "public"."order_items" to "service_role";

grant references on table "public"."order_items" to "service_role";

grant select on table "public"."order_items" to "service_role";

grant trigger on table "public"."order_items" to "service_role";

grant truncate on table "public"."order_items" to "service_role";

grant update on table "public"."order_items" to "service_role";

grant delete on table "public"."orders" to "anon";

grant insert on table "public"."orders" to "anon";

grant references on table "public"."orders" to "anon";

grant select on table "public"."orders" to "anon";

grant trigger on table "public"."orders" to "anon";

grant truncate on table "public"."orders" to "anon";

grant update on table "public"."orders" to "anon";

grant delete on table "public"."orders" to "authenticated";

grant insert on table "public"."orders" to "authenticated";

grant references on table "public"."orders" to "authenticated";

grant select on table "public"."orders" to "authenticated";

grant trigger on table "public"."orders" to "authenticated";

grant truncate on table "public"."orders" to "authenticated";

grant update on table "public"."orders" to "authenticated";

grant delete on table "public"."orders" to "service_role";

grant insert on table "public"."orders" to "service_role";

grant references on table "public"."orders" to "service_role";

grant select on table "public"."orders" to "service_role";

grant trigger on table "public"."orders" to "service_role";

grant truncate on table "public"."orders" to "service_role";

grant update on table "public"."orders" to "service_role";

grant delete on table "public"."payment_methods" to "anon";

grant insert on table "public"."payment_methods" to "anon";

grant references on table "public"."payment_methods" to "anon";

grant select on table "public"."payment_methods" to "anon";

grant trigger on table "public"."payment_methods" to "anon";

grant truncate on table "public"."payment_methods" to "anon";

grant update on table "public"."payment_methods" to "anon";

grant delete on table "public"."payment_methods" to "authenticated";

grant insert on table "public"."payment_methods" to "authenticated";

grant references on table "public"."payment_methods" to "authenticated";

grant select on table "public"."payment_methods" to "authenticated";

grant trigger on table "public"."payment_methods" to "authenticated";

grant truncate on table "public"."payment_methods" to "authenticated";

grant update on table "public"."payment_methods" to "authenticated";

grant delete on table "public"."payment_methods" to "service_role";

grant insert on table "public"."payment_methods" to "service_role";

grant references on table "public"."payment_methods" to "service_role";

grant select on table "public"."payment_methods" to "service_role";

grant trigger on table "public"."payment_methods" to "service_role";

grant truncate on table "public"."payment_methods" to "service_role";

grant update on table "public"."payment_methods" to "service_role";

grant delete on table "public"."payment_options" to "anon";

grant insert on table "public"."payment_options" to "anon";

grant references on table "public"."payment_options" to "anon";

grant select on table "public"."payment_options" to "anon";

grant trigger on table "public"."payment_options" to "anon";

grant truncate on table "public"."payment_options" to "anon";

grant update on table "public"."payment_options" to "anon";

grant delete on table "public"."payment_options" to "authenticated";

grant insert on table "public"."payment_options" to "authenticated";

grant references on table "public"."payment_options" to "authenticated";

grant select on table "public"."payment_options" to "authenticated";

grant trigger on table "public"."payment_options" to "authenticated";

grant truncate on table "public"."payment_options" to "authenticated";

grant update on table "public"."payment_options" to "authenticated";

grant delete on table "public"."payment_options" to "service_role";

grant insert on table "public"."payment_options" to "service_role";

grant references on table "public"."payment_options" to "service_role";

grant select on table "public"."payment_options" to "service_role";

grant trigger on table "public"."payment_options" to "service_role";

grant truncate on table "public"."payment_options" to "service_role";

grant update on table "public"."payment_options" to "service_role";

grant delete on table "public"."products" to "anon";

grant insert on table "public"."products" to "anon";

grant references on table "public"."products" to "anon";

grant select on table "public"."products" to "anon";

grant trigger on table "public"."products" to "anon";

grant truncate on table "public"."products" to "anon";

grant update on table "public"."products" to "anon";

grant delete on table "public"."products" to "authenticated";

grant insert on table "public"."products" to "authenticated";

grant references on table "public"."products" to "authenticated";

grant select on table "public"."products" to "authenticated";

grant trigger on table "public"."products" to "authenticated";

grant truncate on table "public"."products" to "authenticated";

grant update on table "public"."products" to "authenticated";

grant delete on table "public"."products" to "service_role";

grant insert on table "public"."products" to "service_role";

grant references on table "public"."products" to "service_role";

grant select on table "public"."products" to "service_role";

grant trigger on table "public"."products" to "service_role";

grant truncate on table "public"."products" to "service_role";

grant update on table "public"."products" to "service_role";

grant delete on table "public"."shipping_addresses" to "anon";

grant insert on table "public"."shipping_addresses" to "anon";

grant references on table "public"."shipping_addresses" to "anon";

grant select on table "public"."shipping_addresses" to "anon";

grant trigger on table "public"."shipping_addresses" to "anon";

grant truncate on table "public"."shipping_addresses" to "anon";

grant update on table "public"."shipping_addresses" to "anon";

grant delete on table "public"."shipping_addresses" to "authenticated";

grant insert on table "public"."shipping_addresses" to "authenticated";

grant references on table "public"."shipping_addresses" to "authenticated";

grant select on table "public"."shipping_addresses" to "authenticated";

grant trigger on table "public"."shipping_addresses" to "authenticated";

grant truncate on table "public"."shipping_addresses" to "authenticated";

grant update on table "public"."shipping_addresses" to "authenticated";

grant delete on table "public"."shipping_addresses" to "service_role";

grant insert on table "public"."shipping_addresses" to "service_role";

grant references on table "public"."shipping_addresses" to "service_role";

grant select on table "public"."shipping_addresses" to "service_role";

grant trigger on table "public"."shipping_addresses" to "service_role";

grant truncate on table "public"."shipping_addresses" to "service_role";

grant update on table "public"."shipping_addresses" to "service_role";

grant delete on table "public"."shopping_session_items" to "anon";

grant insert on table "public"."shopping_session_items" to "anon";

grant references on table "public"."shopping_session_items" to "anon";

grant select on table "public"."shopping_session_items" to "anon";

grant trigger on table "public"."shopping_session_items" to "anon";

grant truncate on table "public"."shopping_session_items" to "anon";

grant update on table "public"."shopping_session_items" to "anon";

grant delete on table "public"."shopping_session_items" to "authenticated";

grant insert on table "public"."shopping_session_items" to "authenticated";

grant references on table "public"."shopping_session_items" to "authenticated";

grant select on table "public"."shopping_session_items" to "authenticated";

grant trigger on table "public"."shopping_session_items" to "authenticated";

grant truncate on table "public"."shopping_session_items" to "authenticated";

grant update on table "public"."shopping_session_items" to "authenticated";

grant delete on table "public"."shopping_session_items" to "service_role";

grant insert on table "public"."shopping_session_items" to "service_role";

grant references on table "public"."shopping_session_items" to "service_role";

grant select on table "public"."shopping_session_items" to "service_role";

grant trigger on table "public"."shopping_session_items" to "service_role";

grant truncate on table "public"."shopping_session_items" to "service_role";

grant update on table "public"."shopping_session_items" to "service_role";

grant delete on table "public"."shopping_sessions" to "anon";

grant insert on table "public"."shopping_sessions" to "anon";

grant references on table "public"."shopping_sessions" to "anon";

grant select on table "public"."shopping_sessions" to "anon";

grant trigger on table "public"."shopping_sessions" to "anon";

grant truncate on table "public"."shopping_sessions" to "anon";

grant update on table "public"."shopping_sessions" to "anon";

grant delete on table "public"."shopping_sessions" to "authenticated";

grant insert on table "public"."shopping_sessions" to "authenticated";

grant references on table "public"."shopping_sessions" to "authenticated";

grant select on table "public"."shopping_sessions" to "authenticated";

grant trigger on table "public"."shopping_sessions" to "authenticated";

grant truncate on table "public"."shopping_sessions" to "authenticated";

grant update on table "public"."shopping_sessions" to "authenticated";

grant delete on table "public"."shopping_sessions" to "service_role";

grant insert on table "public"."shopping_sessions" to "service_role";

grant references on table "public"."shopping_sessions" to "service_role";

grant select on table "public"."shopping_sessions" to "service_role";

grant trigger on table "public"."shopping_sessions" to "service_role";

grant truncate on table "public"."shopping_sessions" to "service_role";

grant update on table "public"."shopping_sessions" to "service_role";

grant delete on table "public"."support_tickets" to "anon";

grant insert on table "public"."support_tickets" to "anon";

grant references on table "public"."support_tickets" to "anon";

grant select on table "public"."support_tickets" to "anon";

grant trigger on table "public"."support_tickets" to "anon";

grant truncate on table "public"."support_tickets" to "anon";

grant update on table "public"."support_tickets" to "anon";

grant delete on table "public"."support_tickets" to "authenticated";

grant insert on table "public"."support_tickets" to "authenticated";

grant references on table "public"."support_tickets" to "authenticated";

grant select on table "public"."support_tickets" to "authenticated";

grant trigger on table "public"."support_tickets" to "authenticated";

grant truncate on table "public"."support_tickets" to "authenticated";

grant update on table "public"."support_tickets" to "authenticated";

grant delete on table "public"."support_tickets" to "service_role";

grant insert on table "public"."support_tickets" to "service_role";

grant references on table "public"."support_tickets" to "service_role";

grant select on table "public"."support_tickets" to "service_role";

grant trigger on table "public"."support_tickets" to "service_role";

grant truncate on table "public"."support_tickets" to "service_role";

grant update on table "public"."support_tickets" to "service_role";

grant delete on table "public"."users" to "anon";

grant insert on table "public"."users" to "anon";

grant references on table "public"."users" to "anon";

grant select on table "public"."users" to "anon";

grant trigger on table "public"."users" to "anon";

grant truncate on table "public"."users" to "anon";

grant update on table "public"."users" to "anon";

grant delete on table "public"."users" to "authenticated";

grant insert on table "public"."users" to "authenticated";

grant references on table "public"."users" to "authenticated";

grant select on table "public"."users" to "authenticated";

grant trigger on table "public"."users" to "authenticated";

grant truncate on table "public"."users" to "authenticated";

grant update on table "public"."users" to "authenticated";

grant delete on table "public"."users" to "service_role";

grant insert on table "public"."users" to "service_role";

grant references on table "public"."users" to "service_role";

grant select on table "public"."users" to "service_role";

grant trigger on table "public"."users" to "service_role";

grant truncate on table "public"."users" to "service_role";

grant update on table "public"."users" to "service_role";


