
import ExpenseItem from './ExpenseItem';

import styles from './ExpensesList.module.css';

const ExpensesList = (props) => {

  return (
    <ul className={styles['expenses-list']}>
      {props.expenses.map((el) => (
        <ExpenseItem key={el.id} date={el.date} text={el.title} price={el.amount} />
      ))}
    </ul>
  );
};

export default ExpensesList;
