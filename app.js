document.addEventListener('DOMContentLoaded', function () {
    fetchInventory();

    document.getElementById('addProductForm').addEventListener('submit', function (event) {
        event.preventDefault();
        addProduct();
    });
});

function fetchInventory() {
    fetch('/api/inventory')
        .then(response => response.json())
        .then(data => populateTable(data))
        .catch(error => console.error('Error fetching inventory:', error));
}

function populateTable(data) {
    const table = document.getElementById('inventoryTable');
    clearTable(table);

    data.forEach(product => {
        const newRow = table.insertRow(table.rows.length);
        const cell1 = newRow.insertCell(0);
        const cell2 = newRow.insertCell(1);
        const cell3 = newRow.insertCell(2);

        cell1.innerHTML = product._id;
        cell2.innerHTML = product.productName;
        cell3.innerHTML = product.quantity;
    });
}

function clearTable(table) {
    while (table.rows.length > 1) {
        table.deleteRow(1);
    }
}

function addProduct() {
    const productName = document.getElementById('productName').value;
    const quantity = document.getElementById('quantity').value;

    fetch('/api/inventory', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            productName: productName,
            quantity: quantity
        })
    })
        .then(response => response.json())
        .then(data => {
            fetchInventory();
            document.getElementById('productName').value = '';
            document.getElementById('quantity').value = '';
        })
        .catch(error => console.error('Error adding product:', error));
}
