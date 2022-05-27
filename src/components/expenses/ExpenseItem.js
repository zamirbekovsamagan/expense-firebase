
import Card from '../UI/Card';
import ExpenseDate from './ExpenseDate';
import styles from './ExpenseItem.module.css';

function ExpenseItem(props) {
  return (
    <Card className={styles['expense-item']}>
      <ExpenseDate date={props.date} />
      <div className={styles["expense-item__description"]}>
        <h2>{props.text}</h2>
        <div className={styles["expense-item__price"]}>{props.price}</div>
      </div>
    </Card>
  );
}

export default ExpenseItem;
