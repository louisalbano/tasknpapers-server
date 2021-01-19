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
    res.json(rows)
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
    res.json(row)
  })
})

/* POST new task */
router.post('/', function (req, res, next) {
  const data = {
    name: req.body.name,
    description: req.body.description,
    doneFlag: 0
  }
  const sql = `INSERT INTO task (name, description, done_flag) 
    VALUES (?, ?, ?);`
  const params = [data.name, data.description, data.doneFlag]
  db.run(sql, params, function (err, result) {
    if (err) {
      res.status(400).json({ 'error': err.message })
      return
    }
    res.json({ id: this.lastID, ...data })
  });
});

/* PATCH existing task */
router.patch('/:id', function (req, res, next) {
  const data = {
    id: req.params.id,
    name: req.body.name,
    description: req.body.description,
    doneFlag: req.body.doneFlag
  }
  const sql = `UPDATE task SET
  name = COALESCE(?, name),
  description = COALESCE(?, description),
  done_flag = COALESCE(?, done_flag)
  WHERE id = ?`
  const params = [data.name, data.description, data.doneFlag, data.id]
  db.run(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ 'error': res.message })
      return
    }
    res.send(data)
  })
})

module.exports = router;
