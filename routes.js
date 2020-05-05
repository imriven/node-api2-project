
const express = require('express');

const router = express.Router(); //creates new router

router.get('/', (req, res) => {
  res.status(200).send('hello from the GET /posts endpoint');
});

router.get('/:id', (req, res) => {
  res.status(200).send('hello from the GET /users/:id endpoint');
});

router.post('/', (req, res) => {
  res.status(200).send('hello from the POST /users endpoint');
});


module.exports = router; 