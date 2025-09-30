alter table "public"."orders" drop constraint "orders_shipping_options_id_fkey";

alter table "public"."orders" drop column "shipping_options_id";

alter table "public"."orders" add column "shipping_carrier_id" uuid not null;

alter table "public"."orders" add column "shipping_option_id" uuid not null;

alter table "public"."orders" add column "total_cost" numeric(10,2) not null;

alter table "public"."orders" add constraint "orders_shipping_carrier_id_fkey" FOREIGN KEY (shipping_carrier_id) REFERENCES shipping_carriers(id) ON DELETE CASCADE not valid;

alter table "public"."orders" validate constraint "orders_shipping_carrier_id_fkey";

alter table "public"."orders" add constraint "orders_shipping_option_id_fkey" FOREIGN KEY (shipping_option_id) REFERENCES shipping_options(id) ON DELETE CASCADE not valid;

alter table "public"."orders" validate constraint "orders_shipping_option_id_fkey";


