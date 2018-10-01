var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306, // The port number your MySQL is listening on
    user: "root",
    password: "****", // The password for your MySQL database
    database: "bamazon"
  });

  connection.connect(function(err) {
    if (err) throw err;
    if (connection.threadId){
        listProducts();
    }
});

console.log("Welcome to Bamazon!");

function promptUser(){
    inquirer.prompt([
        {
            name: 'item_id',
            type: 'input',
            message: 'Enter the ID of the item you\'d like to purchase: ',
            validate: function(value){
                if(isNaN(value) === false){
                    return true;
                } else {
                    return false;
                }
            }
        },
        {
            name: 'quantity',
            type: 'input',
            message: 'Enter the number of units you\'d like to purchase: ',
            validate: function(value){
                if(isNaN(value) ===  false){
                    return true;
                } else {
                    return false;
                }
            }
        }
    ])
    .then(function(answer) {
        connection.query(
            "SELECT * FROM products WHERE ?",
            {
                item_id: answer.item_id
            },
            function(err, results){
                if (err) throw err;
                if(results.length > 0){
                    var product = results[0];
                    if (answer.quantity <= product.stock_quantity){
                        console.log("Processing your order...");
                        connection.query(
                            "UPDATE products SET ? WHERE ?",
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
                              console.log("Your order has been processed");
                              console.log("Total cost of your purchase: $" + product.price * answer.quantity);
                              console.log("Thank you for shopping at Bamazon!");
                              console.log("---------------------------------------------");
                              connection.end();
                            });
                    }
                    else {
                        console.log("Insufficient quantity in stock. Unable to process your order at this time");
                        console.log("Please enter a lower quantity or select another product. Thank you!");
                        console.log("---------------------------------------------");
                        listProducts();
                    }
                } else {
                    console.log("ERROR. Please enter a valid Item ID");
                    listProducts();
                }
            }
        )
    });
}

function listProducts(){
    connection.query(
        "SELECT * FROM products",
        function(err, results){
            if (err) throw err;
            for (var i = 0; i < results.length; i++){
                console.log(
                    "Item Id: " + results[i].item_id +
                    " || Product Name: " + results[i].product_name +
                    " || Department: " + results[i].department_name +
                    " || Price($): " + results[i].price
                );
            }
            console.log("---------------------------------------------");
            promptUser();
        });
}