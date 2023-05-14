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

router.get('/byname', (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) {
            throw err;
        }

        connection.query('SELECT * FROM Utente WHERE nome_utente=? AND password=?',[req.query.nome_utente, req.query.password], (err, rows) => {
            if (!err) {
                res.send(rows);
            } else {
                console.log(err);
            }

        })
    })
})

router.get('/byname/nomeUtente', (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) {
            throw err;
        }

        connection.query('SELECT nome_cognome FROM Utente WHERE nome_utente=?',[req.query.nome_utente], (err, rows) => {
            if (!err) {
                res.send(rows);
            } else {
                console.log(err);
            }

        })
    })
})

module.exports = router;