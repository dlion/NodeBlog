var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
var config   = require('../config');
var exp      = {};
var db = mongoose.createConnection(config.db.host,config.db.db_name);

var Commenti = new Schema({
    nome: String,
    email: String,
    commento: String,
    creato_il: Date
});


// Definisco il modello articolo
var Articoli = new Schema({
    titolo: { type: String, required: true, index: true},
    testo: String,
    autore: { type: String, index: true},
    tag: [{ type: String, index: true }],
    commenti: [Commenti],
    creato_il: { type: Date, default: Date.now() }
});

// Compilo il modello
exp.articolo = db.model('Articoli', Articoli, 'articoli');

// Definisco il modello utente
var Utenti = new Schema({
    nome: String,
    cognome: String,
    nick: { type: String, required: true, index: { unique: true } },
    password: String,
    email: { type: String, required: true, index: { unique: true, sparse: true } },
    pic: String
});

//Compilo il modello
exp.utenti = db.model('Utenti', Utenti,'utenti');

//Esporto il tutto
module.exports = exp;
