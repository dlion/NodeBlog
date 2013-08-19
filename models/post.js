//
// Module to explain Posts
// 

module.exports = {
    id: { type: "number", unique: true },
    data: { type: "number" },
    categoria_id: { type: "number" },
    titolo: {type: "text"},
    testo: { type: "text" },
    autore_id: { type: "number" }
};


