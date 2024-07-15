const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '12345678',
  database: 'teacher'
});

db.connect(err => {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
  console.log('connected as id ' + db.threadId);
});

const secret = 'your_jwt_secret_key';

// SignUp User
app.post('/api/signup', (req, res) => {
  const { username, email, mobile, password } = req.body;

  const sql = 'INSERT INTO signup (username, email, mobile, password ) VALUES (?, ?, ?, ?)';
  db.query(sql, [username, email, mobile, password], (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.status(200).send({ message: 'User Signup successfully' });
  });
});

// Get user signup details
app.get('/api/signup', (req, res) => {
  const sql = 'SELECT * FROM signup';
  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.status(200).send(results);
  });
});

// Get user signup details by id
app.get('/api/signup/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT * FROM signup WHERE id = ?';
  db.query(sql, [id], (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    if (results.length === 0) {
      return res.status(404).send('No user found.');
    }
    res.status(200).send(results[0]);
  });
});

// Register user
app.post('/api/register', (req, res) => {
  const { name, age, colour, password } = req.body;

  const sql = 'INSERT INTO register (name, age, colour, password) VALUES (?, ?, ?, ?)';
  db.query(sql, [name, age, colour, password], (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.status(200).send({ message: 'User registered successfully' });
  });
});

// Get user register data
app.get('/api/register', (req, res) => {
  const sql = 'SELECT * FROM register';
  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.status(200).send(results);
  });
});

// Get user by id
app.get('/api/register/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT * FROM register WHERE id = ?';
  db.query(sql, [id], (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    if (results.length === 0) {
      return res.status(404).send('No user found.');
    }
    res.status(200).send(results[0]);
  });
});

// Get school data with filters
app.get('/api/school', (req, res) => {
  const { schoolname, type, board, udise } = req.query;

  let sql = 'SELECT * FROM schools WHERE 1=1';
  const params = [];

  if (schoolname) {
    sql += ' AND schoolname LIKE ?';
    params.push(`%${schoolname}%`);
  }
  if (type) {
    sql += ' AND type = ?';
    params.push(type);
  }
  if (board) {
    sql += ' AND board = ?';
    params.push(board);
  }
  if (udise) {
    sql += ' AND udise LIKE ?';
    params.push(`%${udise}%`);
  }

  db.query(sql, params, (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.status(200).send(results);
  });
});

// Add school data
app.post('/api/school', (req, res) => {
  const { schoolname, type, classes, board, udise, address } = req.body;

  const sql = 'INSERT INTO schools (schoolname, type, classes, board, udise, address) VALUES (?, ?, ?, ?, ?, ?)';
  db.query(sql, [schoolname, type, classes, board, udise, address], (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.status(200).send({ message: 'Post Added successfully' });
  });
});

// Get school data by id
app.get('/api/school/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT * FROM schools WHERE id = ?';
  db.query(sql, [id], (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    if (results.length === 0) {
      return res.status(404).send('No user found.');
    }
    res.status(200).send(results[0]);
  });
});

// Update school data by id
app.put('/api/school/:id', (req, res) => {
  const { id } = req.params;
  const { schoolname, type, classes, board, udise, address } = req.body;

  const sql = 'UPDATE schools SET schoolname = ?, type = ?, classes = ?, board = ?, udise = ?, address = ? WHERE id = ?';
  db.query(sql, [schoolname, type, classes, board, udise, address, id], (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.status(200).send({ message: `School with id ${id} updated successfully` });
  });
});

// Delete school data by id
app.delete('/api/school/:id', (req, res) => {
  const { id } = req.params;

  const sql = 'DELETE FROM schools WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.status(200).send({ message: `School with id ${id} deleted successfully` });
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
