
const express = require('express');
const router = express.Router();

// Mock up for user management
let users = [];

router.get('/users', (req, res) => {
  res.json(users);
});

router.post('/users', (req, res) => {
  const user = req.body;
  users.push(user);
  res.status(201).json(user);
});

// More routes and admin functionalities can be added here

module.exports = router;
