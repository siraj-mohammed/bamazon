DROP DATABASE IF EXISTS bamazon; -- Delete the database if it already exists
CREATE DATABASE bamazon; -- Create the database

USE bamazon; -- Subsequent commands will be applied to the selected database

-- Creating the PRODUCTS table and defining column names, data types and lengths
CREATE TABLE products(
item_id INT AUTO_INCREMENT NOT NULL,
product_name VARCHAR(50) NOT NULL,
department_name VARCHAR(50) NOT NULL,
price DECIMAL(10,2) NOT NULL,
stock_quantity INT NOT NULL,
PRIMARY KEY (item_id)
);

-- Inserting Data into the PRODUCTS table
INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ('VTECH Cordless Phone', 'Electronics', 49.95, 185),
    ('SAMSUNG 50" 4K UHD Smart TV', 'Electronics', 476.00, 250),
    ('Diary of a Whimpy Kid', 'Books', 12.96, 75),
    ('Instant Pot V3 6QT', 'Appliances', 99.00, 55),
    ('Dyson V6 Handheld Vacuum', 'Appliances', 119.00, 200),
    ('BH&G Modern Farmhouse 5-cube Organizer', 'Furniture', 82.61, 40),
    ('Yaheetech Home Office Desk', 'Furniture', 55.68, 50),
    ('Graco Pack n Play Portable Playard', 'Baby', 47.63, 30),
    ('OptiShot2 Golf Simulator', 'Sports', 299.00, 20),
    ('Prestone Extended Life Antifreeze', 'Auto', 8.88, 250);