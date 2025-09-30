INSERT INTO public.shipping_options
    ("id", "name", "description", "base_price", "created_at", "updated_at")
VALUES
    ('df0ad3a1-260c-4452-8536-6e7afcbd1161'::uuid, 'Standard Shipping', 'Delivery within 3–7 business days', 5.99, now(), now()),
    ('868a17f2-c530-4638-b2cf-344b4ad94885'::uuid, 'Express Shipping', 'Delivery within 2-3 business days', 15.99, now(), now()),
    ('0d62fc91-3cf8-44e7-8451-8ac2d9b40f37'::uuid, 'Next-Day Shipping', 'Delivery by next business day', 24.99, now(), now());


INSERT INTO public.shipping_carriers
    ("id", "name", "description", "created_at", "updated_at")
VALUES
    ('6d2ec93b-6f6e-4de4-95c6-eafc77a92434'::uuid, 'FedEx', 'FedEx delivery services', now(), now()),
    ('40a2b859-cac0-4c38-a177-d6a129c62e07'::uuid, 'UPS', 'UPS delivery services', now(), now()),
    ('bf053cb3-8c8a-4ea6-bb7d-d9f7ff80bdf6'::uuid, 'USPS', 'United States Postal Service', now(), now()),
    ('d4035a8f-cc8e-441a-b933-07375a561b52'::uuid, 'DHL', 'DHL international express', now(), now());


INSERT INTO public.shipping_option_carriers
    ("shipping_option_id", "shipping_carrier_id")
VALUES
    -- Standard Shipping
    ('df0ad3a1-260c-4452-8536-6e7afcbd1161', 'bf053cb3-8c8a-4ea6-bb7d-d9f7ff80bdf6'), -- USPS
    ('df0ad3a1-260c-4452-8536-6e7afcbd1161', '40a2b859-cac0-4c38-a177-d6a129c62e07'), -- UPS

    -- Express Shipping
    ('868a17f2-c530-4638-b2cf-344b4ad94885', '6d2ec93b-6f6e-4de4-95c6-eafc77a92434'), -- FedEx
    ('868a17f2-c530-4638-b2cf-344b4ad94885', '40a2b859-cac0-4c38-a177-d6a129c62e07'), -- UPS

    -- Next-Day Shipping
    ('0d62fc91-3cf8-44e7-8451-8ac2d9b40f37', '6d2ec93b-6f6e-4de4-95c6-eafc77a92434'), -- FedEx
    ('0d62fc91-3cf8-44e7-8451-8ac2d9b40f37', 'd4035a8f-cc8e-441a-b933-07375a561b52'); -- DHL
