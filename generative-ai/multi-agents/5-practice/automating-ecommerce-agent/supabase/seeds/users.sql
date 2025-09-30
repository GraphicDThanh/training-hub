
INSERT INTO public.users
    ("id", "first_name", "last_name", "email", "phone", "auth_user_id")
VALUES
    ('eabab6f5-9516-4d7b-89b6-9946496fafe8'::uuid, 'Thanh', 'Nguyen', 'thanh.nguyen@asnet.com.vn', '0763651191', '60b1f5ac-96fd-4453-a524-d970d3f62936');


INSERT INTO public.shopping_sessions
    ("id", "user_id", "status")
VALUES
    ('e79d33f9-0ca0-4682-a538-aaa754c973fe'::uuid, 'eabab6f5-9516-4d7b-89b6-9946496fafe8'::uuid, 0);


INSERT INTO public.shipping_addresses
    ("id", "user_id", "address_line_1", "address_line_2", "city", "postal_code", "state", "country", "is_default")
VALUES
    ('3782f24b-452c-4210-9b5d-359f69ae5158'::uuid, 'eabab6f5-9516-4d7b-89b6-9946496fafe8'::uuid, '123 Main St', 'Apt 4B', 'Hanoi', '100000', 'HN', 'Vietnam', false),
    ('36f3a7aa-bcaf-4d06-85c7-8b50bb3b7adc'::uuid, 'eabab6f5-9516-4d7b-89b6-9946496fafe8'::uuid, '114 Nguyen Thi Dinh', '68 Le Chan', 'Da Nang', '55000', 'Da Nang', 'Vietnam', true);

INSERT INTO public.payment_options
    ("id", "name", "category", "provider")
VALUES
    ('1a7d9e4e-1c57-488e-9b1e-d93c5b5a50fa'::uuid, 'Credit/Debit Card', 0, 0),
    ('8d9a2154-4b93-4b7f-a290-5c9e1d1d9f9e'::uuid, 'PayPal', 1, 1),
    ('1a7d9e4e-1c57-488e-9b1e-d93c5b5a50fb'::uuid, 'Bank Transfer', 2, NULL),
    ('c4e53b95-9c38-47da-8e04-cc5573a6e84f'::uuid, 'Cash On Delivery', 3, NULL);

INSERT INTO public.payment_methods
    ("id", "user_id", "payment_option_id", "is_default")
VALUES
    ('00ddfbf3-e206-42b1-85c5-9fa26321c42d'::uuid, 'eabab6f5-9516-4d7b-89b6-9946496fafe8'::uuid, '1a7d9e4e-1c57-488e-9b1e-d93c5b5a50fa'::uuid, true),
    ('36f3a7aa-bcaf-4d06-85c7-8b50bb3b7adc'::uuid, 'eabab6f5-9516-4d7b-89b6-9946496fafe8'::uuid, '8d9a2154-4b93-4b7f-a290-5c9e1d1d9f9e'::uuid, false);