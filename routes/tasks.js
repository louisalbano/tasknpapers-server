const express = require('express');
const router = express.Router();
const db = require('../database.js')

/* GET tasks listing. */
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
