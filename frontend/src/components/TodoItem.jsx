import styles from "./TodoItem.module.css";

const TodoItem = ({ item, id, checked, handleDelete, handleChecked }) => {
  const check = checked ? styles.checked : ""
  return (
    <div className={styles.todolistitem}>
      <div className={styles.todoitem}>
        <span className={check} onClick={() => handleChecked(id)}>{item}</span>
        <span>
          <button
            onClick={() => handleDelete(id)}
            className={styles.todobutton}
          >
            x
          </button>
        </span>
      </div>
      <hr className={styles.line} />
    </div>
  );
};
export default TodoItem;
