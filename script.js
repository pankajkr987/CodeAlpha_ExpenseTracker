
// Function to load expenses from local storage
function loadExpenses() {
    const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    expenses.forEach(expense => addExpenseToList(expense));
}

// Function to add an expense to the list
function addExpenseToList(expense) {
    const expenseList = document.getElementById('expense-list');
    const li = document.createElement('li');
    li.innerHTML = `
    <span>${expense.name}</span>
    <span> ${expense.amount}</span>
    <button class="delete-btn" data-name="${expense.name}">Delete</button>
    `;
    expenseList.appendChild(li);
}

// Function to save expenses to local storage
function saveExpenses(expenses) {
    localStorage.setItem('expenses', JSON.stringify(expenses));
}

// Function to handle form submission
document.getElementById('form').addEventListener('submit', function (e) {
    e.preventDefault();
    const nameInput = document.getElementById('expense-name');
    const amountInput = document.getElementById('expense-amount');

    const name = nameInput.value.trim();
    const amount = parseFloat(amountInput.value.trim());

    if (name && amount) {
        const expense = { name, amount };
        addExpenseToList(expense);

        const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
        expenses.push(expense);
        saveExpenses(expenses);

        nameInput.value = '';
        amountInput.value = '';
    } else {
        alert('Please fill out all fields');
    }
});

// Function to handle deleting an expense
document.getElementById('expense-list').addEventListener('click', function (e) {
    if (e.target.classList.contains('delete-btn')) {
        const name = e.target.getAttribute('data-name');
        const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
        const updatedExpenses = expenses.filter(expense => expense.name !== name);
        saveExpenses(updatedExpenses);
        e.target.parentElement.remove();
    }
});

// Load expenses when the page is loaded
window.addEventListener('load', loadExpenses);
