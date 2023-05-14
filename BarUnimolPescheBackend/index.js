const express = require('express');
const cors = require('cors');

const menuRouter = require('./routes/menu');
const utentiRouter = require('./routes/utenti');
const prenotazioniRouter = require('./routes/prenotazioni');
const app = express();


app.use(cors());
app.use(express.json());

app.use('/menu/test', menuRouter);
app.use('/users/test2', utentiRouter);
app.use('/prenotazioni/test3', prenotazioniRouter);

app.listen(3000);