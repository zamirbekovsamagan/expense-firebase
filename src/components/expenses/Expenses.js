
import styles from  './Expenses.module.css';
import Card from '../UI/Card';
import ExpensesList from './ExpensesList';

function Expenses(props) {


  return (
    <Card className={styles.expenses}>
      <ExpensesList expenses={props.expenses} />
    </Card>
  );
}

export default Expenses;
