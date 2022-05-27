import Expenses from './components/expenses/Expenses';
import NewExpense from './components/newExpense/NewExpense';
import React from 'react';
import styles from './App.module.css';
import { useState} from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [expenses, setExpenses] = useState([])

  const fetchExpenseHandler = async () => {
    return new Promise((resolve, reject) => {
      
        resolve(fetch('https://expense-tracker-6c84f-default-rtdb.firebaseio.com/expense.json')
        .then(response => response.json())
        .then(data => {
          const expenseData = []

          for (let key in data) {
            expenseData.push({
              id: key,
              title: data[key].title,
              amount: data[key].amount,
              date: new Date(data[key].date)
            })
          }
          setExpenses(expenseData)
        }))
      
    })
  }

  const notify = () => {
    toast.promise(
      fetchExpenseHandler, {
      pending: "Fetching...",
      success: "Loaded",
      error: "error"
    },
    { autoClose:1000,
    theme:'dark'}
    )
  }

  let content = <p>No Expenses found</p>

  if (expenses.length > 0) {
    content = <Expenses expenses={expenses} />
  }
  return (
    <div className={styles.App}>
      <ToastContainer />
      <NewExpense />
      <button onClick={notify}>Show Expenses</button>
      {content}
    </div>
  );
}

export default App;


