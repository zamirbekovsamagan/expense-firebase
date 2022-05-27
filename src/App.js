import Expenses from './components/expenses/Expenses';
import NewExpense from './components/newExpense/NewExpense';
import React from 'react';
import { toast, ToastContainer } from 'react-toastify';
import './App.css';
import { useState, useCallback } from 'react';

function App() {
  const [expenses, setExpenses] = useState([])
  const [isLoading, setIsloading] = useState(false)
  const [error, setError] = useState(null)

  const notify = () => toast('Promise resolved')

  const fetchExpenseHandler = useCallback(async()=>{
    setIsloading(true)
    try {
      const response = await  fetch('https://expense-tracker-6c84f-default-rtdb.firebaseio.com/expense.json')
      if (!response.ok) {
        throw new Error('Something went wrong')
      }
      const data = await response.json()
      const expenseData = []

      for(let key in data){
        expenseData.push({
          id:key,
          title:data[key].title, 
          amount: data[key].amount,
          date: data[key].date
        })
      }
      setExpenses(expenseData)
      console.log(data);
    } catch (error) {
      setError(error.message)
    }
    setIsloading(false)

  },[])
  

  let content = <p>No Expenses found</p>

  if(expenses.length > 0){
    content = <Expenses expenses={expenses}/>
  }
  if(error){
    content = <p>{error}</p>
  }
  if(isLoading){
    notify()
  }

  return (
    <div className="App">
      {console.log(expenses)}
      <NewExpense />
      <button onClick={fetchExpenseHandler}>Show Expenses</button>
      {isLoading && <ToastContainer/>}
      {content}
    </div>
  );
}

export default App;


