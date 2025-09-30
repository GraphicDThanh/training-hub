create table "public"."shipping_carriers" (
    "id" uuid not null,
    "name" text not null,
    "description" text,
    "created_at" timestamp without time zone default now(),
    "updated_at" timestamp without time zone default now()
);


create table "public"."shipping_option_carriers" (
    "shipping_option_id" uuid not null,
    "shipping_carrier_id" uuid not null
);


create table "public"."shipping_options" (
    "id" uuid not null,
    "name" text not null,
    "description" text,
    "base_price" numeric(10,2) not null,
    "created_at" timestamp without time zone default now(),
    "updated_at" timestamp without time zone default now()
);


alter table "public"."orders" add column "shipping_options_id" uuid not null;

alter table "public"."orders" add column "total_weight_kg" numeric(10,2) default 0.5;

alter table "public"."products" add column "weight" numeric default 0.5;

CREATE UNIQUE INDEX shipping_carriers_pkey ON public.shipping_carriers USING btree (id);

CREATE UNIQUE INDEX shipping_option_carriers_pkey ON public.shipping_option_carriers USING btree (shipping_option_id, shipping_carrier_id);

CREATE UNIQUE INDEX shipping_options_pkey ON public.shipping_options USING btree (id);

alter table "public"."shipping_carriers" add constraint "shipping_carriers_pkey" PRIMARY KEY using index "shipping_carriers_pkey";

alter table "public"."shipping_option_carriers" add constraint "shipping_option_carriers_pkey" PRIMARY KEY using index "shipping_option_carriers_pkey";

alter table "public"."shipping_options" add constraint "shipping_options_pkey" PRIMARY KEY using index "shipping_options_pkey";

alter table "public"."orders" add constraint "orders_shipping_options_id_fkey" FOREIGN KEY (shipping_options_id) REFERENCES shipping_options(id) ON DELETE CASCADE not valid;

alter table "public"."orders" validate constraint "orders_shipping_options_id_fkey";

alter table "public"."shipping_option_carriers" add constraint "shipping_option_carriers_shipping_carrier_id_fkey" FOREIGN KEY (shipping_carrier_id) REFERENCES shipping_carriers(id) ON DELETE CASCADE not valid;

alter table "public"."shipping_option_carriers" validate constraint "shipping_option_carriers_shipping_carrier_id_fkey";

alter table "public"."shipping_option_carriers" add constraint "shipping_option_carriers_shipping_option_id_fkey" FOREIGN KEY (shipping_option_id) REFERENCES shipping_options(id) ON DELETE CASCADE not valid;

alter table "public"."shipping_option_carriers" validate constraint "shipping_option_carriers_shipping_option_id_fkey";

grant delete on table "public"."shipping_carriers" to "anon";

grant insert on table "public"."shipping_carriers" to "anon";

grant references on table "public"."shipping_carriers" to "anon";

grant select on table "public"."shipping_carriers" to "anon";

grant trigger on table "public"."shipping_carriers" to "anon";

grant truncate on table "public"."shipping_carriers" to "anon";

grant update on table "public"."shipping_carriers" to "anon";

grant delete on table "public"."shipping_carriers" to "authenticated";

grant insert on table "public"."shipping_carriers" to "authenticated";

grant references on table "public"."shipping_carriers" to "authenticated";

grant select on table "public"."shipping_carriers" to "authenticated";

grant trigger on table "public"."shipping_carriers" to "authenticated";

grant truncate on table "public"."shipping_carriers" to "authenticated";

grant update on table "public"."shipping_carriers" to "authenticated";

grant delete on table "public"."shipping_carriers" to "service_role";

grant insert on table "public"."shipping_carriers" to "service_role";

grant references on table "public"."shipping_carriers" to "service_role";

grant select on table "public"."shipping_carriers" to "service_role";

grant trigger on table "public"."shipping_carriers" to "service_role";

grant truncate on table "public"."shipping_carriers" to "service_role";

grant update on table "public"."shipping_carriers" to "service_role";

grant delete on table "public"."shipping_option_carriers" to "anon";

grant insert on table "public"."shipping_option_carriers" to "anon";

grant references on table "public"."shipping_option_carriers" to "anon";

grant select on table "public"."shipping_option_carriers" to "anon";

grant trigger on table "public"."shipping_option_carriers" to "anon";

grant truncate on table "public"."shipping_option_carriers" to "anon";

grant update on table "public"."shipping_option_carriers" to "anon";

grant delete on table "public"."shipping_option_carriers" to "authenticated";

grant insert on table "public"."shipping_option_carriers" to "authenticated";

grant references on table "public"."shipping_option_carriers" to "authenticated";

grant select on table "public"."shipping_option_carriers" to "authenticated";

grant trigger on table "public"."shipping_option_carriers" to "authenticated";

grant truncate on table "public"."shipping_option_carriers" to "authenticated";

grant update on table "public"."shipping_option_carriers" to "authenticated";

grant delete on table "public"."shipping_option_carriers" to "service_role";

grant insert on table "public"."shipping_option_carriers" to "service_role";

grant references on table "public"."shipping_option_carriers" to "service_role";

grant select on table "public"."shipping_option_carriers" to "service_role";

grant trigger on table "public"."shipping_option_carriers" to "service_role";

grant truncate on table "public"."shipping_option_carriers" to "service_role";

grant update on table "public"."shipping_option_carriers" to "service_role";

grant delete on table "public"."shipping_options" to "anon";

grant insert on table "public"."shipping_options" to "anon";

grant references on table "public"."shipping_options" to "anon";

grant select on table "public"."shipping_options" to "anon";

grant trigger on table "public"."shipping_options" to "anon";

grant truncate on table "public"."shipping_options" to "anon";

grant update on table "public"."shipping_options" to "anon";

grant delete on table "public"."shipping_options" to "authenticated";

grant insert on table "public"."shipping_options" to "authenticated";

grant references on table "public"."shipping_options" to "authenticated";

grant select on table "public"."shipping_options" to "authenticated";

grant trigger on table "public"."shipping_options" to "authenticated";

grant truncate on table "public"."shipping_options" to "authenticated";

grant update on table "public"."shipping_options" to "authenticated";

grant delete on table "public"."shipping_options" to "service_role";

grant insert on table "public"."shipping_options" to "service_role";

grant references on table "public"."shipping_options" to "service_role";

grant select on table "public"."shipping_options" to "service_role";

grant trigger on table "public"."shipping_options" to "service_role";

grant truncate on table "public"."shipping_options" to "service_role";

grant update on table "public"."shipping_options" to "service_role";


