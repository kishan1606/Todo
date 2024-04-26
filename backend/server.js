import express from "express";
import mysql from "mysql";
import cors from "cors";
import bcrypt from "bcrypt";
const saltRounds = 10;

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
  const pswd = req.body.password.toString();
  bcrypt.hash(pswd, saltRounds, (err, hash) => {
    if (err) {
      console.log(err);
    }
    const sql =
      "INSERT INTO login(`name`,`email`,`password`,`username`) VALUES (?)";
    const values = [req.body.name, req.body.email, hash, req.body.username];
    db.query(sql, [values], (err, data) => {
      if (err) {
        return res.json("Error");
      }
      return res.json("created successufully");
    });
  });
});

app.post("/login", (req, res) => {
  const password = req.body.password.toString();
  const sql = "SELECT * FROM login WHERE username = ?";
  db.query(sql, [req.body.username], (err, data) => {
    if (err) {
      return res.json("Error");
    }
    if (data.length > 0) {
      bcrypt.compare(password, data[0].password, (error, response) => {
        if (response) {
          res.json("Success");
        } else {
          res.json("Wrong username/password combination!");
        }
      });
    } else {
      return res.json("User dont exist");
    }
  });
});

app.post("/todo", (req, res) => {
  const sql = "INSERT INTO todolist(`todo`,`author`,`checked`) VALUES (?)";
  const values = [req.body.todo, req.body.author, req.body.checked];
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
  const author = req.query.author;
  if (!author) {
    return res
      .status(400)
      .json({ error: "Username not found in localStorage" });
  }
  db.query(q, [author], (err, data) => {
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
