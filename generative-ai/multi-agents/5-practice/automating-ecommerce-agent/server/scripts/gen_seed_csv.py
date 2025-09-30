# This script use with Supabase dashboard, it help generate csv file to seed data to the database via Supabase dashboard.
import os
import json


def gen_categories_seed_data_file(source_file, gen_file):
    """ Generate Supabase seed CSV from JSON file for categories. """
    csv_string = 'id,name\n'
    row_value_format = "%s,%s\n"
    last_row_value_format = "%s,%s"

    with open(source_file, "r", encoding="utf-8") as file:
        data = json.load(file)
        count = len(data["categories"])
        row_value_format_apply = row_value_format

        for index, category in enumerate(data["categories"]):
            if index == count - 1:
                row_value_format_apply = last_row_value_format

            csv_string += row_value_format_apply % (str(category["id"]), category["name"])

        # Write sql file:
        with open(gen_file, "w", encoding="utf-8") as f:
            f.write(csv_string)


def gen_products_seed_data_file(source_file, gen_file):
    """ Generate Supabase seed SQL from JSON file for products """
    csv_string = 'id,name,description,price,sizes,category_id,thumbnail,url,quantity\n'
    row_value_format = '%s,%s,"%s",%f,"%s",%s,%s,%s,%d\n'
    last_row_value_format = '%s,%s,"%s",%f,"%s",%s,%s,%s,%d'

    with open(source_file, "r", encoding="utf-8") as file:
        data = json.load(file)
        count = len(data["products"])
        row_value_format_apply = row_value_format

        for index, product in enumerate(data["products"]):
            if index == count - 1:
                row_value_format_apply = last_row_value_format

            sizes = ",".join(product.get("sizes", []))
            csv_string += row_value_format_apply % (
                product["id"],
                product["name"],
                product["description"].replace('"', '""'),
                float(product["price"]),
                sizes,
                product["category_id"],
                product["thumbnail"],
                product["url"],
                product["quantity"],
            )

        # Write sql file:
        with open(gen_file, "w", encoding="utf-8") as f:
            f.write(csv_string)


if __name__ == "__main__":
    source_file = os.path.abspath("server/data/seeding/ecommerce.json")
    gen_file = os.path.abspath("supabase_cloud/seeds/categories.csv")
    gen_categories_seed_data_file(source_file, gen_file)

    gen_file = os.path.abspath("supabase_cloud/seeds/products.csv")
    gen_products_seed_data_file(source_file, gen_file)