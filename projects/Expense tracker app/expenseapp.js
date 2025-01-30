document.addEventListener("DOMContentLoaded", () => {
    const expenseTypeSelect = document.getElementById("expense-type");
    const expenseAmountInput = document.getElementById("expense-amount");
    const expenseDetailInput = document.getElementById("expense-detail");
    const recordExpenseButton = document.getElementById("record-expense");
    const categoryExpenses = document.getElementById("category-expenses");
    const expenseList = document.getElementById("expense-list");
    const totalExpense = document.getElementById("total-expense");
    const showAllExpensesButton = document.getElementById("show-all-expenses");
    const categoryButtons = document.querySelectorAll(".category-btn");

    let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

    function groupExpensesByCategory() {
        return expenses.reduce((acc, expense) => {
            if (!acc[expense.type]) acc[expense.type] = [];
            acc[expense.type].push(expense);
            return acc;
        }, {});
    }

    function renderCategoryExpenses() {
        const groupedExpenses = groupExpensesByCategory();
        categoryExpenses.innerHTML = "";

        Object.keys(groupedExpenses).forEach(category => {
            const categoryDiv = document.createElement("div");
            categoryDiv.classList.add("category-container");
            categoryDiv.id = `${category.toLowerCase().replace(/ & /g, '-').replace(/\s/g, '-')}-expenses`;
            categoryDiv.style.display = "none";

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
            groupedExpenses[category].forEach(expense => {
                const tr = document.createElement("tr");
                tr.innerHTML = ` 
                    <td>${expense.detail}</td>
                    <td>Rs ${expense.amount.toFixed(2)}</td>
                `;
                tbody.appendChild(tr);
            });
            categoryTable.appendChild(tbody);
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

    showAllExpensesButton.addEventListener("click", () => {
        expenseList.style.display = expenseList.style.display === "none" ? "block" : "none";
        totalExpense.style.display = totalExpense.style.display === "none" ? "block" : "none";
        showAllExpensesButton.textContent = expenseList.style.display === "block" ? "Hide All Expenses" : "Show All Expenses";
    });

    categoryButtons.forEach(button => {
        button.addEventListener("click", () => {
            const category = button.dataset.category;
            const categoryDiv = document.getElementById(`${category.toLowerCase().replace(/ & /g, '-').replace(/\s/g, '-')}-expenses`);
            if (categoryDiv) {
                categoryDiv.style.display = categoryDiv.style.display === "none" ? "block" : "none";
            }
        });
    });

    renderExpenses();
    calculateTotal();
    renderCategoryExpenses();
});
