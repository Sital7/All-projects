// script.js
const numberInput = document.getElementById("numberInput");
const generateButton = document.getElementById("generateButton");
const tableContainer = document.getElementById("tableContainer");

generateButton.addEventListener("click", () => {
    const number = parseInt(numberInput.value, 10);

    if (isNaN(number) || number < 1) {
        tableContainer.innerHTML = "<p>Please enter a valid positive number.</p>";
        return;
    }

    // Clear any existing content
    tableContainer.innerHTML = "";

    // Create the multiplication table
    const table = document.createElement("table");
    table.style.width = "100%";
    table.style.borderCollapse = "collapse";

    for (let i = 1; i <= 10; i++) {
        const row = document.createElement("tr");

        const td1 = document.createElement("td");
        td1.textContent = `${number} x ${i}`;
        td1.style.padding = "10px";
        td1.style.border = "1px solid #ccc";

        const td2 = document.createElement("td");
        td2.textContent = `= ${number * i}`;
        td2.style.padding = "10px";
        td2.style.border = "1px solid #ccc";

        row.appendChild(td1);
        row.appendChild(td2);
        table.appendChild(row);
    }

    // Add the table to the container
    tableContainer.appendChild(table);
});
