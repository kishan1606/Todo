import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Validation from "./LoginValidation";
import axios from "axios";
import style from "./Login.module.css";

function Login() {
  const [values, setValues] = useState({ username: "", password: "" });
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [backendError, setBackendError] = useState([]);

  const handleInput = (event) => {
    setValues((prev) => ({
      ...prev,
      [event.target.name]: [event.target.value],
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const err = Validation(values);
    setErrors(err);
    if (err.username === "" && err.password === "") {
      try {
        const res = await axios.post("http://localhost:8880/login", values);
        if (res.data.errors) {
          setBackendError(res.data.errors);
        } else {
          setBackendError([]);
          if (res.data === "Success") {
            localStorage.setItem("username", values.username);
            navigate("/home");
          } else {
            alert("No record existed");
            console.log(res);
          }
        }
      } catch (err) {
        console.log(err);
        setErrors(true);
      }
    }
  };
  return (
    <div className={style.page}>
      <div className={style.container}>
        <h2>Sign-In</h2>
        {backendError ? (
          backendError.map((e) => <p className={style.error}>{e.msg}</p>)
        ) : (
          <span></span>
        )}
        <form noValidate onSubmit={handleSubmit}>
          <div className={style.formGroup}>
            <label htmlFor="username" className={style.flabel}>
              <strong>User Name</strong>
            </label>
            <input
              type="text"
              placeholder="Enter User Name"
              name="username"
              onChange={handleInput}
              className={style.finput}
            />
            {errors.username && (
              <span className={style.error}> {errors.username}</span>
            )}
          </div>
          <div className={style.formGroup}>
            <label htmlFor="password" className={style.flabel}>
              <strong>Password</strong>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              name="password"
              onChange={handleInput}
              className={style.finput}
            />
            {errors.password && (
              <span className={style.error}> {errors.password}</span>
            )}
          </div>
          <button type="submit" className={style.btn}>Log in</button>
          <Link to="/signup" className={style.btn}>
            Create Account
          </Link>
        </form>
      </div>
    </div>
  );
}
export default Login;
