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

// Task 4: Create a Function to Calculate Total for an Order
function calculateOrderTotal(order) {
    // Error checking to make sure orders array has records 
    if (!orders.length > 0) {
        return;
    }
    
    let totalCost = 0; // Initialize summation variable
    order.items.forEach(element => { // Go through items property of the selected order
        // Select item from inventory corresponsing with current item
        const inventoryItem = inventory.find(item => item.name === element['name']);
        totalCost += (element['quantity'] * inventoryItem['price']);
    });

    return totalCost;
}
console.log(calculateOrderTotal(orders[0])); // Output: 42

// Task 5: Create a Function to Mark an Order as Completed
function completeOrder(customerName) {
    // Find the customer order from orders array
    const selectedOrder = orders.find(order => order.customerName === customerName);

    if (!selectedOrder) {
        console.log("Selected customer not found. Cannot change order status.")
        return; // Break out of function
    }

    selectedOrder.status = "Completed"; // Change status
}

// Task 6: Create a Function to Check Pending Orders
function checkPendingOrders() {
    // Go through all orders
    orders.forEach(element => {
        // Only care about pending orders
        if (element['status'] === "Pending") {
            console.log("Order submitted by " + element['customerName'] + " is still pending.\nOrder Details:") //Output: Order submitted by Logan is still pending. Order Deatails: 
            // Go through elements of the items array for pending orders
            element.items.forEach(element => {
                console.log("   Item: " + element['name'] + " | Quantity: " + element['quantity']); // Output: Item: Espresso | Quantity: 9; Item: Mocha | Quantity: 3
            });
        }
    });
}
checkPendingOrders();