import axios from "axios";
import TodoItem from "./TodoItem";
import styles from "./TodoList.module.css";


const TodoList = ({todoList,setTodoList}) =>{

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8880/todo/${id}`);
      setTodoList(todoList.filter(item => item.id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  const handleChecked = async (id) => {
    try {
      await axios.put(`http://localhost:8880/todo/${id}/toggle`);
      const res = await axios.get("http://localhost:8880/todo",{
          params:{author:localStorage.getItem("username")}
        });
      setTodoList(res.data);

    } catch (err) {
      console.log(err);
    }
  }

  const sortedTodos = todoList.slice().sort((a,b)=>Number(a.checked)-Number(b.checked))

  return (
    <div>
      {todoList.length > 0 ? (
        <div className={styles.listitem}>
          {/* {console.log(todoList)} */}
          {sortedTodos.map((item) => (
            <>
            {console.log(item)}
            <TodoItem
              key={item.id}
              item={item.todo}
              id = {item.id}
              checked = {item.checked}
              handleDelete={handleDelete}
              handleChecked={handleChecked}
            />
            </>
          ))}
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}
export default TodoList;