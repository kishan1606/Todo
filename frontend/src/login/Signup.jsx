import React, { useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import Validation from "./SignupValidation";

import axios from "axios";
import style from "./Signup.module.css";

function Signup() {
  const [values, setValues] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [errors, setErrors] = useState(false);
  const [terms, setTerms] = useState(false);

  const handleTerms=()=>{
    setTerms(!terms)
  }

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
    if (
      err.name === "" &&
      err.username === "" &&
      err.email === "" &&
      err.password === ""
    ) {
      try {
        await axios.post("http://localhost:8880/signup", values);
        console.log("values saved success");
        navigate("/");
      } catch (err) {
        console.log(err);
        setErrors(true);
      }
    }
  };
  return (
    <div className={style.page}>
      <div className={style.container}>
        <h2>Sign-Up</h2>
        <form noValidate onSubmit={handleSubmit}>
          <div className={style.formGroup}>
            <label htmlFor="name" className={style.flabel}>
              <strong>Name</strong>
            </label>
            <input
              type="text"
              placeholder="Enter Name"
              name="name"
              onChange={handleInput}
              className={style.finput}
            />
            {errors.name && <span className={style.error}> {errors.name}</span>}
          </div>
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
            <label htmlFor="email" className={style.flabel}>
              <strong>Email</strong>
            </label>
            <input
              type="email"
              placeholder="Enter Email"
              name="email"
              onChange={handleInput}
              className={style.finput}
            />
            {errors.email && (
              <span className={style.error}> {errors.email}</span>
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
          <div className={style.formGroup}>
            <label>
              <input type="checkbox" checked={terms} onChange={handleTerms}></input>You are agree to our terms and
              conditions
            </label>
          </div>
          <button type="submit" className={style.btn} disabled={!terms}>
            Sign up
          </button>
          <Link to="/" className={style.btn}>
            Login
          </Link>
        </form>
      </div>
    </div>
  );
}
export default Signup;
