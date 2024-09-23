//Task 1: Create an Inventory Array of Product Objects
const inventory = [ // Main inventory array
    {name: 'Espresso', price: 3, quantity: 10},
    {name: 'Latte', price: 4, quantity: 5},    
    {name: 'Cappuccino', price: 4, quantity: 6},
    {name: 'Mocha', price: 5, quantity: 4}
];

//Task 2: Create an Orders Array of Order Objects
const orders = [] // Initialize orders array

// Task 3: Create a Function to Place an Order
function placeOrder(customerName, incomingOrder) {
    let cancelOrder = false; // Flag to break out of function

    incomingOrder.forEach(element => { // Go through order to be added to orders array
        // Select item from inventory corresponsing with current item
        const inventoryItem = inventory.find(item => item.name === element['name']);
        // Check if ordered product exceeds current stock
        if (element['quantity'] > inventoryItem['quantity']) {
            console.log("Ordered quantity for " + element['name'] + " exceeds current inventory. Cancelling order.")
            cancelOrder = true;
            return; // Break out of forEach loop
        }
    });

    if (cancelOrder) {
        return; // Break out of function
    }

    incomingOrder.forEach(element => { // Go through order to be added to orders array
        // Select item from inventory corresponsing with current item
        const inventoryItem = inventory.find(item => item.name === element['name']);
        inventoryItem['quantity'] -= element['quantity']; // Decrement inventory stock
    });

    // Add new order to orders array
    const newOrder = {customerName: customerName, items: incomingOrder, status: 'Pending'};
    orders.push(newOrder);
}

// Test new order
const testOrder = [{name: 'Espresso', quantity: 9}, {name: 'Mocha', quantity: 3}]
placeOrder("Logan", testOrder);