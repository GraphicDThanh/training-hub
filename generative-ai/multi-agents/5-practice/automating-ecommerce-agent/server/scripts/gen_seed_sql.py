# This script use with Supabase local CLI, it help generate SQL file to seed data to the database.
import os
import json


def gen_categories_seed_data_file(source_file, gen_file):
    """ Generate Supabase seed SQL from JSON file for categories. """
    sql_string = '-- gen from server/data/seeding/ecommerce.json via script gen_seed_sql.py\nINSERT INTO public.categories\n    ("id", "name")\nVALUES \n'
    row_value_format = "    ('%s'::uuid, '%s'),\n"
    last_row_value_format = "    ('%s'::uuid, '%s');\n"

    with open(source_file, "r", encoding="utf-8") as file:
        data = json.load(file)
        count = len(data["categories"])
        row_value_format_apply = row_value_format

        for index, category in enumerate(data["categories"]):
            if index == count - 1:
                row_value_format_apply = last_row_value_format

            sql_string += row_value_format_apply % (str(category["id"]), category["name"])

        # Write sql file:
        with open(gen_file, "w", encoding="utf-8") as f:
            f.write(sql_string)


def gen_products_seed_data_file(source_file, gen_file):
    """ Generate Supabase seed SQL from JSON file for products """
    sql_string = '-- gen from server/data/seeding/ecommerce.json via script gen_seed_sql.py\nINSERT INTO public.products\n    ("id", "name", "description", "price", "sizes", "category_id", "thumbnail", "url", "quantity")\nVALUES \n'
    row_value_format = "    ('%s'::uuid, '%s', '%s', '%s', '%s', '%s', '%s', '%s', %s),\n"
    last_row_value_format = "    ('%s'::uuid, '%s', '%s', '%s', '%s', '%s', '%s', '%s', %s);\n"

    with open(source_file, "r", encoding="utf-8") as file:
        data = json.load(file)
        count = len(data["products"])
        row_value_format_apply = row_value_format

        for index, product in enumerate(data["products"]):
            if index == count - 1:
                row_value_format_apply = last_row_value_format

            sizes = ",".join(product.get("sizes", []))
            sql_string += row_value_format_apply % (
                product["id"],
                product["name"],
                product["description"],
                product["price"],
                sizes,
                product["category_id"],
                product["thumbnail"],
                product["url"],
                product["quantity"],
            )

        # Write sql file:
        with open(gen_file, "w", encoding="utf-8") as f:
            f.write(sql_string)


if __name__ == "__main__":
    source_file = os.path.abspath("server/data/seeding/ecommerce.json")
    gen_file = os.path.abspath("supabase/seeds/categories.sql")
    gen_categories_seed_data_file(source_file, gen_file)

    gen_file = os.path.abspath("supabase/seeds/products.sql")
    gen_products_seed_data_file(source_file, gen_file)