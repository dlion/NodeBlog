var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/nodeblog');

// Definisco il modello
var Articolo = mongoose.model('Articolo', {
	titolo: String,
	testo: String,
	autore: String,
	tag: {
		nome: String
	},
	commenti: {
		nome: String,
		email: String,
		commento: String,
		creato_il: { type: Date, default: Date.now() }
	},
	creato_il: { type: Date, default: Date.now() }
});

//Inserisco un articolo

var post = new Articolo({
	titolo: "Un titolo",
	testo: "Nella grande casa blu",
	autore: "DLion",
	tag: {
		nome: "Prova"
	},
	commenti: {
		nome: "Estraneo",
		email: "estraneo@gmail.ti",
		commento: "Commento produttivo"
	}
});


// Trovo tutti i post di DLion
Articolo.find({ autore: "DLion" },function(err, dato) {
		console.log("QUI STAMPO: "+dato);
		mongoose.disconnect();
});
