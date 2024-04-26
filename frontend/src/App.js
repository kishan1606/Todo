import Todo from "./components/Todo";
import Footer from "./components/Footerfile";
import Header from "./components/Headerfile";
import "./App.css";
import Login from "./login/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "./login/Signup";
import Home from "./components/Home";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>}></Route>
          <Route path="/signup" element={<Signup/>}></Route>
          <Route path="/home" element={<Home/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
