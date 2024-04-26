import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "signup",
});

app.get("/login", (req, res) => {
  const q = "SELECT * FROM login";
  db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json(data);
  });
});

app.post("/signup", (req, res) => {
  const sql = "INSERT INTO login(`name`,`email`,`password`,`username`) VALUES (?)";
  const values = [req.body.name, req.body.email, req.body.password, req.body.username];
  db.query(sql, [values], (err, data) => {
    if (err) {
      return res.json("Error");
    }
    return res.json("created successufully");
  });
});

app.post("/login", (req, res) => {
  const sql = "SELECT * FROM login WHERE username = ? AND password = ?";
  db.query(sql, [req.body.username, req.body.password], (err, data) => {
    if (err) {
      return res.json("Error");
    }
    if (data.length > 0) {
      return res.json("Success");
    } else {
      return res.json("Faile");
    }
  });
});

app.post("/todo", (req, res) => {
  const sql = "INSERT INTO todolist(`todo`,`author`,`checked`) VALUES (?)";
  const values = [req.body.todo,req.body.author,req.body.checked ];
  db.query(sql, [values], (err, data) => {
    if (err) {
      return res.json("Error creating todo");
    }
    console.log(req.body.todo);
    return res.json("todo created successufully");
  });
});

app.put("/todo/:id/toggle", (req, res) => {
  const id = req.params.id;
  const sql = "UPDATE todolist SET checked = NOT checked WHERE id = ?";
  db.query(sql, [id], (err, data) => {
    if (err) {
      return res.json("Error updating todo item");
    }
    return res.json("Todo item updated successfully");
  });
});

app.delete("/todo/:id", (req, res) => {
  const todoId = req.params.id;
  const sql = " DELETE FROM todolist WHERE id = ? ";
  db.query(sql, [todoId], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.get("/todo", (req, res) => {
  const q = "SELECT * FROM todolist WHERE author = ?";
  const author = req.query.author 
  if (!author) {
    return res.status(400).json({ error: "Username not found in localStorage" });
  }
  db.query(q,  [author], (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json(data);
  });
});

app.listen(8880, () => {
  console.log("listening");
});
