//
// Module to explain Posts
// 

module.exports = {
    id: { type: "number", unique: true },
    data: { type: "date", time: true },
    categoria_id: { type: "number" },
    testo: { type: "text" },
    //l'orm vuole le FK nel formato ciccio_id
    autore_id: { type: "number" }
};


