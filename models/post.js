//
// Module to explain Posts
// 

module.exports = {
    id: { type: "number", unique: true },
    data: { type: "number" },
    categoria_id: { type: "number" },
    testo: { type: "text" },
    autore_id: { type: "number" }
};


