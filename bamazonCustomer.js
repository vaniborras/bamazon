var mysql = require("mysql");
var inquirer = require("inquirer");
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    // Your username
    user: "root",
    // Your password
    password: "",
    database: "bamazon_DB"
});
connection.connect(function (err) {
    if (err) throw err;
    console.log("working so far");
    openMarket();
    // connection.end();
});
function openMarket() {
    connection.query("SELECT * FROM products", function (err, res) {
        for (var i = 0; i < res.length; i++) {
            console.log(`${res[i].item_id} | ${res[i].product_name} | ${res[i].price}`);
        }
        // NEED TO REVIEW NEXT LINE
        if (i === res.length) {
            listItems();
        }
        console.log("coming along")
    });
}
function listItems() {
    inquirer
        .prompt([{
            name: "action",
            type: "input",
            message: "To initiate purchase simply enter the product ID"
        },
            {
                type: "input",
                name: "confirm amount",
                message: "How many would you like to purchase?"
            }
        ])
    .then(function (userInput) {
        console.log(userInput);
        if (userInput.stock_quantity > userInput.numItems) {
            let newQuantity = (parseInt(userInput.stock_quantity) - parseInt(userInput.numItems));
            console.log(`New Quantity: ${newQuantity}`);
            console.log(typeof(newQuantity));
            let thisQuery = "UPDATE products SET ? WHERE ?";
            connection.query(thisQuery,
                [
                    {
                        stock_quantity: newQuantity
                    },
                    {
                        product_name: "'" + answer.product + "'"
                    }
                ], err => {
                    console.log(query.sql);
                    if (err) throw err;
                    console.log(`Purchase Accepted! Your total is ${userInput.price * parseInt(userInput.numItems)}`);
                });
        } else {
            console.log(`Sorry, we are out of stock and cannot place your order. Check back with us later!`);
        }
    }).catch(function (err){
        if(err) throw err;
        console.log(err);
        }
    );
    connection.end();
};

