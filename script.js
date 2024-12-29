// Function to load data from LocalStorage
function loadData() {
    const savedData = JSON.parse(localStorage.getItem("weddingExpenses")) || [];
    const tableBody = document.getElementById("expense-table-body");
    tableBody.innerHTML = ""; // Clear existing rows
  
    savedData.forEach((row, index) => {
      addRowToTable(row, index, savedData.length);
    });
  
    updateGrandTotal();
  }
  
  // Function to add a row to the table
  function addRowToTable(row, index, totalRows) {
    const tableBody = document.getElementById("expense-table-body");
    const newRow = document.createElement("tr");
    newRow.innerHTML = `
      <td>${row.itemName}</td>
      <td>${row.advancePayment}</td>
      <td>${row.totalPayment}</td>
      <td>${row.paymentLeft}</td>
      <td>
        <button class="edit-btn" onclick="editItem(${index})">Edit</button>
        <button class="delete-btn" onclick="deleteItem(${index})">Delete</button>
        <button class="move-up-btn" onclick="moveUp(${index})" ${index === 0 ? "disabled" : ""}>↑</button>
        <button class="move-down-btn" onclick="moveDown(${index})" ${index === totalRows - 1 ? "disabled" : ""}>↓</button>
      </td>
    `;
    tableBody.appendChild(newRow);
  }
  
  // Function to add a new item
  function addItem() {
    const itemName = document.getElementById("item-name").value;
    const advancePayment = parseFloat(document.getElementById("advance-payment").value);
    const totalPayment = parseFloat(document.getElementById("total-payment").value);
    const paymentLeft = totalPayment - advancePayment;
  
    if (itemName && !isNaN(advancePayment) && !isNaN(totalPayment)) {
      const savedData = JSON.parse(localStorage.getItem("weddingExpenses")) || [];
      const newItem = { itemName, advancePayment, totalPayment, paymentLeft };
      savedData.push(newItem);
      localStorage.setItem("weddingExpenses", JSON.stringify(savedData));
      loadData();
    } else {
      alert("Please fill out all fields correctly.");
    }
  }
  
  // Function to edit an item
  function editItem(index) {
    const savedData = JSON.parse(localStorage.getItem("weddingExpenses")) || [];
    const item = savedData[index];
  
    // Pre-fill the form with the item's data
    document.getElementById("item-name").value = item.itemName;
    document.getElementById("advance-payment").value = item.advancePayment;
    document.getElementById("total-payment").value = item.totalPayment;
  
    // Update the "Add" button to "Save Changes"
    const formButton = document.querySelector("form button");
    formButton.textContent = "Save Changes";
    formButton.onclick = function () {
      const updatedItem = {
        itemName: document.getElementById("item-name").value,
        advancePayment: parseFloat(document.getElementById("advance-payment").value),
        totalPayment: parseFloat(document.getElementById("total-payment").value),
        paymentLeft: parseFloat(document.getElementById("total-payment").value) - parseFloat(document.getElementById("advance-payment").value)
      };
  
      savedData[index] = updatedItem;
      localStorage.setItem("weddingExpenses", JSON.stringify(savedData));
      loadData();
  
      // Reset the button and clear the form
      formButton.textContent = "Add Item";
      formButton.onclick = function () {
        addItem();
        return false;
      };
      document.querySelector("form").reset();
      return false;
    };
  }
  
  // Function to delete an item
  function deleteItem(index) {
    const savedData = JSON.parse(localStorage.getItem("weddingExpenses")) || [];
    savedData.splice(index, 1);
    localStorage.setItem("weddingExpenses", JSON.stringify(savedData));
    loadData();
  }
  
  // Function to move an item up in the list
  function moveUp(index) {
    const savedData = JSON.parse(localStorage.getItem("weddingExpenses")) || [];
    [savedData[index - 1], savedData[index]] = [savedData[index], savedData[index - 1]];
    localStorage.setItem("weddingExpenses", JSON.stringify(savedData));
    loadData();
  }
  
  // Function to move an item down in the list
  function moveDown(index) {
    const savedData = JSON.parse(localStorage.getItem("weddingExpenses")) || [];
    [savedData[index], savedData[index + 1]] = [savedData[index + 1], savedData[index]];
    localStorage.setItem("weddingExpenses", JSON.stringify(savedData));
    loadData();
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
  
