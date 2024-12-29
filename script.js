// Function to load data from LocalStorage
function loadData() {
    const savedData = JSON.parse(localStorage.getItem("weddingExpenses")) || [];
    const tableBody = document.getElementById("expense-table-body");
    tableBody.innerHTML = ""; // Clear existing rows
  
    savedData.forEach(row => {
      const newRow = document.createElement("tr");
      newRow.innerHTML = `
        <td>${row.itemName}</td>
        <td>${row.advancePayment}</td>
        <td>${row.totalPayment}</td>
        <td>${row.paymentLeft}</td>
      `;
      tableBody.appendChild(newRow);
    });
  
    updateGrandTotal();
  }
  
  // Function to add a new item
  function addItem() {
    const itemName = document.getElementById("item-name").value;
    const advancePayment = parseFloat(document.getElementById("advance-payment").value);
    const totalPayment = parseFloat(document.getElementById("total-payment").value);
    const paymentLeft = totalPayment - advancePayment;
  
    if (itemName && !isNaN(advancePayment) && !isNaN(totalPayment)) {
      // Get existing data from LocalStorage
      const savedData = JSON.parse(localStorage.getItem("weddingExpenses")) || [];
  
      // Add the new item to the data array
      savedData.push({ itemName, advancePayment, totalPayment, paymentLeft });
  
      // Save the updated data back to LocalStorage
      localStorage.setItem("weddingExpenses", JSON.stringify(savedData));
  
      // Add the new row to the table immediately
      const tableBody = document.getElementById("expense-table-body");
      const newRow = document.createElement("tr");
      newRow.innerHTML = `
        <td>${itemName}</td>
        <td>${advancePayment}</td>
        <td>${totalPayment}</td>
        <td>${paymentLeft}</td>
      `;
      tableBody.appendChild(newRow);
  
      updateGrandTotal(); // Update the grand total
    } else {
      alert("Please fill out all fields correctly.");
    }
  }
  
  // Function to calculate and display the grand total
  function updateGrandTotal() {
    const tableBody = document.getElementById("expense-table-body");
    let totalPaymentSum = 0;
    let advancePaymentSum = 0;
  
    tableBody.querySelectorAll("tr").forEach(row => {
      const cells = row.querySelectorAll("td");
      advancePaymentSum += parseFloat(cells[1].textContent);
      totalPaymentSum += parseFloat(cells[2].textContent);
    });
  
    const paymentLeftSum = totalPaymentSum - advancePaymentSum;
  
    document.getElementById("grand-total").textContent = `Advance Payment: ${advancePaymentSum}, Total Payment: ${totalPaymentSum}, Payment Left: ${paymentLeftSum}`;
  }
  
  // Load data when the page loads
  document.addEventListener("DOMContentLoaded", loadData);
  
