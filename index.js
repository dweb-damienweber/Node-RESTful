const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mysql = require('mysql');

app.use(bodyParser.json());

// Database connection
const conn = mysql.createConnection({
  host: ' ',
  user: ' ',
  password: ' ',
  database: ' '
});

conn.connect((err) =>{
  if(err) throw err;

  console.log('Mysql Connected');
});

// Server
app.listen(8000,() =>{
  console.log('Server started on port 8000');
});

/*
CREATE
*/

// Add new task
app.post('/api/tasks',(req, res) => {
  let data = {product_name: req.body.product_name};
  let sql = "INSERT INTO task SET ?";
  let query = conn.query(sql, data,(err, results) => {
    if(err) throw err;

    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});

/*
READ
*/

// Get all tasks
app.get('/api/tasks',(req, res) => {
  let sql = "SELECT * FROM task";
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;

    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});

// Get single task
app.get('/api/tasks/:id',(req, res) => {
  let sql = "SELECT * FROM task WHERE task_id="+req.params.id;
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;

    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});

/*
UPDATE
*/

// Update task
app.put('/api/tasks/:id',(req, res) => {
  let sql = "UPDATE task SET task_name='"+req.body.task_name+"' WHERE task_id="+req.params.id;
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;

    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});

/*
DELETE
*/

// Delete task
app.delete('/api/tasks/:id',(req, res) => {
  let sql = "DELETE FROM task WHERE task_id="+req.params.id+"";
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;

      res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});
