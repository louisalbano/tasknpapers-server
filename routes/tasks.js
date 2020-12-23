const express = require('express');
const router = express.Router();
const db = require('../database.js')

/* GET all tasks */
router.get('/', function (req, res, next) {
  const sql = 'SELECT * FROM task;'
  const params = []
  db.all(sql, params, (err, rows) => {
    if (err) {
      res.status(400).json({ 'error': err.message })
      return
    }
    res.json({
      'message': 'success',
      'data': rows
    })
  })
});

/* GET task by id */
router.get('/:id', function (req, res, next) {
  const sql = 'SELECT * FROM task WHERE id = ?'
  const params = [req.params.id]
  db.get(sql, params, (err, row) => {
    if (err) {
      res.status(400).json({ 'error': err.message })
      return
    }
    res.json({
      'message': 'success',
      'data': row
    })
  })
})

/* POST new task */
router.post('/', function (req, res, next) {
  const data = {
    name: req.body.name,
    description: req.body.description
  }
  const sql = `INSERT INTO task (name, description, done_flag) 
    VALUES (?, ?, 0);`
  const params = [data.name, data.description]
  db.run(sql, params, function (err, result) {
    if (err) {
      res.status(400).json({ 'error': err.message })
      return
    }
    res.json({
      'message': 'success',
      'data': data,
      'id': this.lastID
    })
  });
});

module.exports = router;
