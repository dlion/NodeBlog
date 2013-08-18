//
// Modules to explain users
// 

module.exports = {
    id: { type: "number", unique: true },
    nick: { type: "text", size: 50 },
    email: { type: "text", size: 100 },
    password: { type: "text", size: 255 },
    hash: { type: "text", size: 255 },
    last_login: { type: "number" }
};
