//
// Module to explain Posts
// 

module.exports = {
    id: { type: "number", unique: true },
    data: { type: "date", time: true },
    id_categoria: { type: "number" },
    testo: { type: "text" },
    autore: { type: "number" }
};


