const express = require('express');
const mysql = require('mysql2');
const router = express.Router();

const pool = mysql.createPool({
    host: 'db_backend',
    // host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'backend',
    waitForConnections: true,
    connectionLimit: 100,
    queueLimit: 0
});

router.get('/lunedi', (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) {
            throw err;
        }
        // console.log(`connected ad id ${connection.threadId}`);

        connection.query(`SELECT * FROM Menu WHERE giorno='Lunedi'`, (err, rows) => {
            if (!err) {
                res.send(rows);
            } else {
                console.log(err);
            }

        })
    })
})

router.get('/martedi', (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) {
            throw err;
        }

        connection.query(`SELECT * FROM Menu WHERE giorno='Martedi'`, (err, rows) => {
            if (!err) {
                res.send(rows);
            } else {
                console.log(err);
            }

        })
    })
})

router.get('/mercoledi', (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) {
            throw err;
        }

        connection.query(`SELECT * FROM Menu WHERE giorno='Mercoledi'`, (err, rows) => {
            if (!err) {
                res.send(rows);
            } else {
                console.log(err);
            }

        })
    })
})

router.get('/giovedi', (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) {
            throw err;
        }

        connection.query(`SELECT * FROM Menu WHERE giorno='Giovedi'`, (err, rows) => {
            if (!err) {
                res.send(rows);
            } else {
                console.log(err);
            }

        })
    })
})

router.get('/venerdi', (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) {
            throw err;
        }

        connection.query(`SELECT * FROM Menu WHERE giorno='Venerdi'`, (err, rows) => {
            if (!err) {
                res.send(rows);
            } else {
                console.log(err);
            }

        })
    })
})

module.exports = router;