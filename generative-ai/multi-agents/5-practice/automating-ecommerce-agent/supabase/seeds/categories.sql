-- gen from server/data/seeding/ecommerce.json via script gen_seed_sql.py
INSERT INTO public.categories
    ("id", "name")
VALUES
    ('1a7d9e4e-1c57-488e-9b1e-d93c5b5a50fa'::uuid, 'jacket'),
    ('3c5d77b8-2b95-4a74-baa5-8f8e62229b15'::uuid, 'shirt'),
    ('7b61df7e-d882-4f42-a2dc-f3a83a1fcb5d'::uuid, 'coat'),
    ('8d9a2154-4b93-4b7f-a290-5c9e1d1d9f9e'::uuid, 'top'),
    ('bdf8a744-784c-4d8b-b29c-230cfbbdd71e'::uuid, 't-shirt'),
    ('1a7d9e4e-1c57-488e-9b1e-d93c5b5a50fb'::uuid, 'skirt'),
    ('c4e53b95-9c38-47da-8e04-cc5573a6e84f'::uuid, 'dress'),
    ('d7fc7328-8af3-4dc2-a2f6-dc47f2f86b9c'::uuid, 'tops'),
    ('e67d4d34-9092-4794-8d91-d1e7e4d5b48c'::uuid, 'sweater'),
    ('f84d7123-6cd9-4c6d-9b87-5485f6d8a1f4'::uuid, 'pants');
