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

router.post('/', (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) {
            throw err;
        }

        connection.query(`INSERT INTO Prenotazione (nome_utente, nome_cognome, fascia, primo, secondo, contorno) 
                VALUES ('${req.body.nomeUtente}', '${req.body.nomeCognome}', '${req.body.fascia}', '${req.body.primo}', '${req.body.secondo}', '${req.body.contorno}')`, (err, rows) => {
            if (!err) {
                res.send(rows);
            } else {
                console.log(err);
            }

        })
    })
})


router.get('/numPren', (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) {
            throw err;
        }

        connection.query('SELECT num_pren FROM Prenotazione WHERE nome_utente=?', [req.query.nome_utente], (err, rows) => {
            if (!err) {
                res.send(rows);
            } else {
                console.log(err);
            }

        })
    })
})

router.get('/utente', (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) {
            throw err;
        }

        connection.query('SELECT * FROM Prenotazione WHERE nome_utente=?', [req.query.nome_utente], (err, rows) => {
            if (!err) {
                res.send(rows);
            } else {
                console.log(err);
            }

        })
    })
})


router.get('/idPrenotazione', (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) {
            throw err;
        }

        connection.query('SELECT num_pren FROM Prenotazione WHERE nome_utente=?', [req.query.nome_utente], (err, rows) => {
            if (!err) {
                res.send(rows);
            } else {
                console.log(err);
            }

        })
    })
})


router.put('/rimuoviPrenotazione', (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) {
            throw err;
        }

        connection.query(`UPDATE Prenotazione SET nome_utente = 'Cancellato', nome_cognome = '', fascia='0', primo = '', secondo = '', contorno = '' WHERE nome_utente = ?`, [req.query.nome_utente], (err, rows) => {
            if (!err) {
                res.send(rows);
            } else {
                console.log(err);
            }

        })
    })
})

router.put('/modificaPrenotazione', (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) {
            throw err;
        }

        connection.query(`UPDATE Prenotazione SET fascia='${req.body.fascia}', primo = '${req.body.primo}', secondo = '${req.body.secondo}', contorno = '${req.body.contorno}' WHERE nome_utente = '${req.body.nomeUtente}'`, (err, rows) => {
            if (!err) {
                res.send(rows);
            } else {
                console.log(err);
            }

        })
    })
})

module.exports = router;