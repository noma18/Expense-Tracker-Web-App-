// Adding expenses to local storage
document.getElementById('add-expense').addEventListener('click', function () {
    const date = document.getElementById('date').value;
    const amount = document.getElementById('amount').value;
    const description = document.getElementById('description').value;
    const category = document.getElementById('category').value;

    if (date && amount && description && category) {
        const expense = { date, amount, description, category };
        let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
        expenses.push(expense);
        localStorage.setItem('expenses', JSON.stringify(expenses));

        alert('Expense added successfully');
        document.getElementById('expense-form').reset();
    } else {
        alert('Please fill in all fields');
    }
});

// Viewing monthly expenses
// Viewing monthly expenses
document.getElementById('view-expense').addEventListener('click', function () {
    const year = document.getElementById('view-year').value;
    const month = document.getElementById('view-month').value;
    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

    const filteredExpenses = expenses.filter(expense => {
        const expenseDate = new Date(expense.date);
        return expenseDate.getFullYear() == year && (expenseDate.getMonth() + 1) == month;
    });

    const expenseDisplay = document.getElementById('expense-display');
    expenseDisplay.innerHTML = ''; // Clear previous content

    expenseDisplay.classList.add('active'); // Always ensure display is active
    
    if (filteredExpenses.length > 0) {
        filteredExpenses.forEach(expense => {
            const expenseItem = document.createElement('div');
            expenseItem.classList.add('expense-item');
            expenseItem.innerHTML = `
                <p><strong>Date:</strong> ${expense.date}</p>
                <p><strong>Amount:</strong> Rs. ${expense.amount}</p>
                <p><strong>Description:</strong> ${expense.description}</p>
                <p><strong>Category:</strong> ${expense.category}</p>
            `;
            expenseDisplay.appendChild(expenseItem);
        });
    } else {
        // If no expenses found, show this message
        expenseDisplay.innerHTML = '<p>No expenses found for this month.</p>';
    }
});
