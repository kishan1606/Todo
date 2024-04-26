import { useEffect, useState } from "react";
import FormInput from "./FormInput";
import TodoList from "./TodoList";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Todo = () => {
  const [todoList, setTodoList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("username"); //used to prevent back after logout
    if (!isAuthenticated) {
      navigate("/");
    }
    const fetchAllTodo = async () => {
      try {
        const res = await axios.get("http://localhost:8880/todo",{
          params:{author:isAuthenticated}
        });
        setTodoList(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllTodo();
  }, []);

  return (
    <div>
      <FormInput todoList={todoList} setTodoList={setTodoList} />
      <TodoList todoList={todoList} setTodoList={setTodoList} />
    </div>
  );
};
export default Todo;
