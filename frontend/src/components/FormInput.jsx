import { useState } from "react";
import styles from "./FormInput.module.css";
import axios from "axios";

const FormInput = ({ todoList, setTodoList }) => {
  const initialTodo = {
    todo: "",
    author: localStorage.getItem("username"),
    checked: false,
  };
  const [todo, setTodo] = useState(initialTodo); //used for input values

  const handleChange = (e) => {
    setTodo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res1 = await axios.post("http://localhost:8880/todo", todo);
      const res = await axios.get("http://localhost:8880/todo",{
          params:{author:localStorage.getItem("username")}
        });
      setTodoList(res.data);
      setTodo({
        todo: "",
        author: localStorage.getItem("username"),
        checked: false,
      });
      e.target.elements.todo.value = "";
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className={styles.maindiv}>
      <form onSubmit={handleSubmit} className={styles.todoform}>
        <div className={styles.formdiv}>
          <input
            className={styles.forminput}
            onChange={handleChange}
            type="text"
            placeholder="enter tasks"
            name="todo"
          />
          <button className={styles.formbutton} type="submit">
            ADD
          </button>
        </div>
      </form>
    </div>
  );
};
export default FormInput;
