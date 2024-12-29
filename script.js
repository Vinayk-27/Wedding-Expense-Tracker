document.getElementById('addItemButton').addEventListener('click', addItem);

function addItem() {
    const itemName = document.getElementById('itemName').value;
    const advancePayment = parseFloat(document.getElementById('advancePayment').value);
    const totalPayment = parseFloat(document.getElementById('totalPayment').value);

    if (!itemName || isNaN(advancePayment) || isNaN(totalPayment)) {
        alert('Please fill out all fields correctly.');
        return;
    }

    const paymentLeft = totalPayment - advancePayment;

    const tableBody = document.querySelector('#expenseTable tbody');
    const row = document.createElement('tr');

    row.innerHTML = `
        <td>${itemName}</td>
        <td>${advancePayment.toFixed(2)}</td>
        <td>${totalPayment.toFixed(2)}</td>
        <td>${paymentLeft.toFixed(2)}</td>
        <td><button onclick="deleteItem(this)">Delete</button></td>
    `;

    tableBody.appendChild(row);

    updateGrandTotal();

    document.getElementById('itemName').value = '';
    document.getElementById('advancePayment').value = '';
    document.getElementById('totalPayment').value = '';
}

function deleteItem(button) {
    const row = button.parentElement.parentElement;
    row.remove();
    updateGrandTotal();
}

function updateGrandTotal() {
    const rows = document.querySelectorAll('#expenseTable tbody tr');
    let grandTotal = 0;

    rows.forEach(row => {
        const paymentLeft = parseFloat(row.cells[3].innerText);
        grandTotal += paymentLeft;
    });

    document.getElementById('grandTotal').innerText = grandTotal.toFixed(2);
}
