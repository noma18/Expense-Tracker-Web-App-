from flask import Flask, render_template, request, jsonify
import json
import os
import datetime

app = Flask(__name__)

EXPENSES_FILE = 'expenses.json'

# Load expenses from file
def load_expenses():
    if os.path.exists(EXPENSES_FILE):
        with open(EXPENSES_FILE, 'r') as f:
            try:
                return json.load(f)
            except json.JSONDecodeError:
                return []
    return []

# Save expenses to file
def save_expenses(expenses):
    with open(EXPENSES_FILE, 'w') as f:
        json.dump(expenses, f, indent=4)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/add_expense', methods=['POST'])
def add_expense():
    data = request.json
    expenses = load_expenses()

    expense = {
        'date': data['date'],
        'amount': data['amount'],
        'description': data['description'],
        'category': data['category']
    }
    expenses.append(expense)
    save_expenses(expenses)

    return jsonify({"message": "Expense added successfully!"}), 200

@app.route('/get_monthly_expenses', methods=['GET'])
def get_monthly_expenses():
    year = request.args.get('year')
    month = request.args.get('month')
    expenses = load_expenses()

    monthly_expenses = [expense for expense in expenses if expense['date'].startswith(f"{year}-{month.zfill(2)}")]
    total_expense = sum(exp['amount'] for exp in monthly_expenses)

    return jsonify({'expenses': monthly_expenses, 'total': total_expense})

if __name__ == '__main__':
    app.run(debug=True)
