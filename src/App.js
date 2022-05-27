import Expenses from './components/expenses/Expenses';
import NewExpense from './components/newExpense/NewExpense';
import React from 'react';
import styles from './App.module.css';
import { useState, useCallback } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [expenses, setExpenses] = useState([])

  const fetchExpenseHandler = useCallback(async () => {
    toast('Loading...')
    try {
      const response = await fetch('https://expense-tracker-6c84f-default-rtdb.firebaseio.com/expense.json1')
      if (!response.ok) {
        throw new Error('Something went wrong')
      }
      const data = await response.json()
      const expenseData = []

      for (let key in data) {
        expenseData.push({
          id: key,
          title: data[key].title,
          amount: data[key].amount,
          date: new Date(data[key].date)
        })
      }
      toast.success('Data successfully got')
      setExpenses(expenseData)
    } catch (error) {
      toast.error('Something went wrong')
    }

  }, [])


  let content = <p>No Expenses found</p>

  if (expenses.length > 0) {
    content = <Expenses expenses={expenses} />
  }
  return (
    <div className={styles.App}>
      <ToastContainer/>
      <NewExpense />
      <button onClick={fetchExpenseHandler}>Show Expenses</button>
      {content}
    </div>
  );
}

export default App;


