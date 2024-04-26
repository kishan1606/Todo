import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import style from "./Headerfile.module.css";

function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("username");
    navigate("/");
  };

  return (
    <div className={style.header}>
      <div className={style.users}>
        Hello {localStorage.getItem("username")}
      </div>
      <div className={style.titles}>TODO LIST</div>
      <div className={style.logoutBtn}>
        <button className={style.btn} onClick={handleLogout}>Log Out</button>
      </div>
    </div>
  );
}

export default Header;
