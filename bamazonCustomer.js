// Import required libraries
var mysql = require("mysql");
var inquirer = require("inquirer");

// Create a connection to MySQL
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306, // The port number your MySQL is listening on
    user: "root",
    password: "****", // The password for your MySQL database
    database: "bamazon"
  });

// Open the connection to MySQL
connection.connect(function(err) {
    if (err) throw err;
    if (connection.threadId){
        // When connection to MySQL is successful, run a SQL query and list all items in inventory
        listProducts();
    }
});

console.log("Welcome to Bamazon!");

// Run a Select all query against the products table and prettify the results
function listProducts(){
    connection.query(
        "SELECT * FROM products",
        function(err, results){
            if (err) throw err;
            for (var i = 0; i < results.length; i++){
                console.log(
                    " Item Id: " + results[i].item_id +
                    " || Product Name: " + results[i].product_name +
                    " || Department: " + results[i].department_name +
                    " || Price($): " + results[i].price
                );
            }
            console.log("---------------------------------------------");
            // Once inventory is displayed, invoke the inquirer prompt
            promptUser();
        });
}

function promptUser(){
    inquirer.prompt([
        {
            name: 'item_id',
            type: 'input',
            message: 'Enter the ID of the item you\'d like to purchase: ',
            validate: function(value){
                if(Math.sign(value) === 1 && Number.isInteger(parseFloat(value)) === true){
                    return true;
                } else {
                    return "Invalid input. Please try again";
                }
            }
        },
        {
            name: 'quantity',
            type: 'input',
            message: 'Enter the number of units you\'d like to purchase: ',
            validate: function(value){
                if(Math.sign(value) === 1 && Number.isInteger(parseFloat(value)) === true){
                    return true;
                } else {
                    return "Invalid input. Please try again";
                }
            }
        }
    ])
    .then(function(answer) {
        connection.query(
            "SELECT * FROM products WHERE ?",
            {
                item_id: answer.item_id // Select only the item that has an ID matching user's input
            },
            function(err, results){
                if (err) throw err;
                if(results.length > 0){ // If the user selected a valid ID and a response was received from the database
                    var product = results[0]; // Since IDs are unique per product, select the first item in the results array 
                    if (answer.quantity <= product.stock_quantity){ // If there's enough in stock to process user's order
                        console.log("Processing your order...");
                        connection.query(
                            "UPDATE products SET ? WHERE ?", // Update stock inventory
                            [
                              {
                                stock_quantity: product.stock_quantity - answer.quantity
                              },
                              {
                                item_id: answer.item_id
                              }
                            ],
                            function(err) {
                              if (err) throw err;
                              // Display confirmation and total $ amount of purchase to user
                              console.log("Your order has been processed");
                              console.log("Total cost of your purchase: $" + product.price * answer.quantity);
                              console.log("Thank you for shopping at Bamazon!");
                              console.log("---------------------------------------------");
                              connection.end();
                            });
                    }
                    else { // If the requested quantity is not available..
                        console.log("Insufficient quantity in stock. Sorry, we are unable to process your order at this time");
                        console.log("Please enter a lower quantity or select another product. Thank you!");
                        console.log("---------------------------------------------");
                        listProducts(); // Show inventory
                    }
                } else { // If the user entered an invalid number for ID, and no response was received from MySQL
                    console.log("ERROR. Please enter a valid Item ID");
                    listProducts(); // Show inventory
                }
            }
        )
    });
}
