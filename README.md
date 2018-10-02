# Welcome to Bamazon!

## Description
_bamazon_ is a simple CLI-based storefront app built on Node.js and MySQL. The app allows store customers to pick an item from the products list and place an order for a desired quantity. It has built-in intelligence to verify the order - an order is processed only if the customer enters a valid product and orders quantity that can be fulfilled with the current stock. If the customer attempts to order more quantity than currently in stock, the order is not processed.

## The Database
A local MySQL database can be created by running the included bamazon.sql query in a MySQL client of your choice. The query creates a _bamazon_ database and populates the _products_ table with some sample values.
The following screenshot shows the outcome of running the query in [MySQL Workbench](https://dev.mysql.com/downloads/workbench/)

![sample _bamazon_ database](https://siraj-mohammed.github.io/bamazon/Screenshots/1-database_created_updated.jpg)

## The App
Before you run the bamazonCustomer.js app, be sure to install the required npm packages, namely `mysql` and `inquirer` by issuing the command `npm install`

When the app is run, it presents the following screen to the customer:
![Welcome to Bamazon](https://siraj-mohammed.github.io/bamazon/Screenshots/2-inventory_display.jpg)

The customer is presented with the products in inventory, alongwith each product's Item ID, Name, Department and Price. The customer is prompted to select a product from the list, and then enter the desired quantity they wish to order. Validations are built in to only accept positive integers as valid inputs. 

![Invalid input](https://siraj-mohammed.github.io/bamazon/Screenshots/3-validation_invalid_itemID.jpg)

If the customer enters valid input, the order is processed and the customer is presented with the total cost of their purchase. The _products_ table is updated to reflect the current stock quantity.

_products_ table before the transaction
![DB before transaction](https://siraj-mohammed.github.io/bamazon/Screenshots/4-db_before_transaction.jpg)

A successful transaction via CLI. Total cost of purchase is calculated and displayed.
![Successful transaction](https://siraj-mohammed.github.io/bamazon/Screenshots/5-successful_transaction.jpg)

_products_ table update after a valid transaction
![DB after transaction](https://siraj-mohammed.github.io/bamazon/Screenshots/6-db_after_transaction.jpg)

However, if the customer enters an invalid product ID (a number not presented in the list), or if they order a quantity that's not currently in stock, the order is not processed.

If an invalid item ID is entered:
![Invalid item ID](https://siraj-mohammed.github.io/bamazon/Screenshots/7-validation_incorrect_itemID.jpg)

When order cannot be processed due to insufficient quantity in stock
![Insufficient quantity](https://siraj-mohammed.github.io/bamazon/Screenshots/8-validation_insufficient_quantity.jpg)


## Tools/Technologies Used
- Node.js
- mysql npm library
- inquirer npm library