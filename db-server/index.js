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

app.get("/", (req, res) => {
  res.send('hello');
});

app.get("/home", (req, res) => {
  const sqlQuery = "SELECT * FROM db.TODOLIST;";
  db.query(sqlQuery, (err, result) => {
    res.send(result);
  });
});

//todo
app.post("/home", (req, res) => {
  const todo = req.body;
  console.log(todo);
  const sqlQuery =
    "INSERT INTO TODOLIST(TODO_CONTENT, TODO_CHECK) VALUES (?, 0);";

  db.query(sqlQuery, [todo.content], (err, result) => {
    if (err) console.log(err);
    else res.send(result);
  });
});

// app.get("/mypage", (req, res) => {
//   const sqlQuery = "INSERT INTO requested (rowno) VALUES (1)";
//   db.query(sqlQuery, (err, result) => {
//     console.log(err);
//     res.send("success!");
//   });
// });

app.listen(PORT, () => {
  console.log(`running on port ${PORT}`);
});
