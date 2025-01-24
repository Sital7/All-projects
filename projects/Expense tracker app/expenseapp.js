document.addEventListener("DOMContentLoaded", () => {
    const expenseTypeSelect = document.getElementById("expense-type");
    const expenseAmountInput = document.getElementById("expense-amount");
    const expenseDetailInput = document.getElementById("expense-detail");
    const recordExpenseButton = document.getElementById("record-expense");
    const categoryExpenses = document.getElementById("category-expenses");
    const expenseList = document.getElementById("expense-list");
    const totalExpense = document.getElementById("total-expense");
    const toggleExpensesButton = document.getElementById("toggle-expenses");
    const toggleTotalButton = document.getElementById("toggle-total");

    let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

    function groupExpensesByCategory() {
        const grouped = expenses.reduce((acc, expense) => {
            if (!acc[expense.type]) acc[expense.type] = [];
            acc[expense.type].push(expense);
            return acc;
        }, {});
        return grouped;
    }

    function renderCategoryExpenses() {
        const groupedExpenses = groupExpensesByCategory();
        categoryExpenses.innerHTML = "";

        Object.keys(groupedExpenses).forEach((category) => {
            const categoryDiv = document.createElement("div");
            categoryDiv.classList.add("category-container");

            const categoryTitle = document.createElement("h2");
            categoryTitle.textContent = `${category} Expenses`;
            categoryDiv.appendChild(categoryTitle);

            const categoryTable = document.createElement("table");
            categoryTable.innerHTML = `
                <thead>
                    <tr>
                        <th>Detail</th>
                        <th>Amount</th>
                    </tr>
                </thead>
            `;

            const tbody = document.createElement("tbody");
            groupedExpenses[category].forEach((expense) => {
                const tr = document.createElement("tr");
                tr.innerHTML = `
                    <td>${expense.detail}</td>
                    <td>Rs ${expense.amount.toFixed(2)}</td>
                `;
                tbody.appendChild(tr);
            });
            categoryTable.appendChild(tbody);

            const categoryTotal = groupedExpenses[category].reduce((sum, exp) => sum + exp.amount, 0);
            const totalRow = document.createElement("tr");
            totalRow.innerHTML = `
                <td><strong>Total</strong></td>
                <td><strong>Rs ${categoryTotal.toFixed(2)}</strong></td>
            `;
            tbody.appendChild(totalRow);

            categoryDiv.appendChild(categoryTable);
            categoryExpenses.appendChild(categoryDiv);
        });
    }

    function renderExpenses() {
        expenseList.innerHTML = "";
        expenses.forEach((expense, index) => {
            const li = document.createElement("li");
            li.innerHTML = `
                ${expense.type} - Rs ${expense.amount.toFixed(2)}<br>Detail: ${expense.detail}
                <button class="edit" onclick="editExpense(${index})">Edit</button>
                <button class="delete" onclick="deleteExpense(${index})">Delete</button>
            `;
            expenseList.appendChild(li);
        });
    }

    function calculateTotal() {
        const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
        totalExpense.textContent = `Total: Rs ${total.toFixed(2)}`;
    }

    function saveExpenses() {
        localStorage.setItem("expenses", JSON.stringify(expenses));
    }

    function recordExpense() {
        const type = expenseTypeSelect.value;
        const amount = parseFloat(expenseAmountInput.value.trim());
        const detail = expenseDetailInput.value.trim();

        if (type && amount && detail) {
            expenses.push({ type, amount, detail });
            expenseTypeSelect.value = "";
            expenseAmountInput.value = "";
            expenseDetailInput.value = "";
            renderExpenses();
            calculateTotal();
            renderCategoryExpenses();
            saveExpenses();
            alert("Expense Recorded Successfully!");
        } else {
            alert("Please fill in all fields.");
        }
    }

    window.deleteExpense = function (index) {
        expenses.splice(index, 1);
        renderExpenses();
        calculateTotal();
        renderCategoryExpenses();
        saveExpenses();
    };

    window.editExpense = function (index) {
        const expense = expenses[index];
        expenseTypeSelect.value = expense.type;
        expenseAmountInput.value = expense.amount;
        expenseDetailInput.value = expense.detail;

        recordExpenseButton.innerHTML = "Update Expense";
        recordExpenseButton.onclick = function () {
            const updatedType = expenseTypeSelect.value;
            const updatedAmount = parseFloat(expenseAmountInput.value.trim());
            const updatedDetail = expenseDetailInput.value.trim();

            if (updatedType && updatedAmount && updatedDetail) {
                expenses[index] = { type: updatedType, amount: updatedAmount, detail: updatedDetail };
                expenseTypeSelect.value = "";
                expenseAmountInput.value = "";
                expenseDetailInput.value = "";
                recordExpenseButton.innerHTML = "Record Expense";

                renderExpenses();
                calculateTotal();
                renderCategoryExpenses();
                saveExpenses();
                alert("Expense Updated Successfully!");
            } else {
                alert("Please fill in all fields.");
            }
        };
    };

    recordExpenseButton.addEventListener("click", recordExpense);

    toggleExpensesButton.addEventListener("click", () => {
        if (expenseList.style.display === "none") {
            expenseList.style.display = "block";
            toggleExpensesButton.textContent = "Hide All Expenses";
        } else {
            expenseList.style.display = "none";
            toggleExpensesButton.textContent = "Show All Expenses";
        }
    });

    toggleTotalButton.addEventListener("click", () => {
        if (totalExpense.style.display === "none") {
            totalExpense.style.display = "block";
            toggleTotalButton.textContent = "Hide Total";
        } else {
            totalExpense.style.display = "none";
            toggleTotalButton.textContent = "Show Total";
        }
    });

    renderExpenses();
    calculateTotal();
    renderCategoryExpenses();
});
