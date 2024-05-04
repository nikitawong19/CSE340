-- Insert the following new record to the account table
INSERT INTO public.account
(account_firstname, account_lastname, account_email, account_password)
VALUES
('Tony', 'Stark', 'tony@starkent.com', 'Iam1ronM@n')

-- Modify the Tony Stark record to change the account_type to "Admin"
UPDATE account
SET account_type = 'Admin'

-- Delete the Tony Stark record from the database.
DELETE from account 

-- Modify the "GM Hummer" record to read "a huge interior" rather than "small interiors"
UPDATE inventory
SET inv_description = REPLACE(inv_description, 'small interiors', 'huge interior')
WHERE inv_id = 10;

-- Use an inner join to select the make and model fields from the inventory table and the classification name field from the classification table for inventory items that belong to the "Sport" category.
SELECT inv_make, inv_model, classification.classification_name
FROM inventory
INNER JOIN classification
ON inventory.classification_id = classification.classification_id
WHERE classification.classification_name = 'Sport';

-- Update all records in the inventory table to add "/vehicles" to the middle of the file path in the inv_image and inv_thumbnail columns
UPDATE inventory
SET inv_image = REPLACE(inv_image, '/images', '/images/vehicles/'),
    inv_thumbnail = REPLACE(inv_thumbnail, '/images', '/images/vehicles')