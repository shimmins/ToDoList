const express = require("express");
const cors = require("cors");
const app = express();
const mysql = require("mysql");
const PORT = process.env.port || 8000;

let corsOptions = {
  origin: "*",
  credentials: true, // 사용자 인증이 필요한 리소스 접근
};
app.use(cors(corsOptions));

//sql 연동
var db = mysql.createPool({
  host: "db-server.cabsry9iojbu.us-east-2.rds.amazonaws.com",
  user: "admin",
  password: "soldesk1.",
  database: "db_server",
});

app.get("/home", (req, res) => {
  const sqlQuery = "SELECT * FROM TODOLIST;";
  db.query(sqlQuery, (err, result) => {
    res.send(result);
    console.log(result);
  });
});

var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//todo
app.post("/home", (req, res) => {
  const todo = req.body.todo;
  console.log(todo);

  const sqlQuery =
    "INSERT INTO TODOLIST(TODO_CONTENT, TODO_CHECK) VALUES (?, false);";

  db.query(sqlQuery, [todo], (err, result) => {
    if (err) console.log(err);
    else res.send(result);
  });
});

//login
app.post("/login", (req, res) => {
  const id = req.body.id;
  console.log(id);

  const sqlQuery = `SELECT * FROM USER WHERE USER_ID = '${id}';`;

  db.query(sqlQuery, [id], (err, result) => {
    if (err) console.log(err);
    else res.send(result);
  });
});

//join
app.post("/", (req, res) => {
  const name = req.body.user.USER_NAME;
  const id = req.body.user.USER_ID;
  const password = req.body.user.USER_PASSWORD;
  console.log(req.body.user)

  const sqlQuery = "INSERT INTO USER(USER_NAME, USER_ID, USER_PASSWORD) VALUES (?, ?, ?);";
  db.query(sqlQuery, [name, id, password], (err, result) => {
    if (err) console.log(err);
    else res.send(result);
  });
});

//delete
app.delete("/delete", (req, res) => {
  const id = req.body.id;
  console.log(id);

  const sqlQuery = "DELETE from TODOLIST WHERE TODO_ID=?;";
  db.query(sqlQuery, [id], (err, result) => {
    if (err) console.log(err);
    else res.send(result);
  });
});

app.listen(PORT, () => {
  console.log(`running on port ${PORT}`);
});
