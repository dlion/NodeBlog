//
// Modules to explain users
// 

module.exports = {
    id: { type: Number, dataType: 'tinyint' },
    nick: { type: String, dataType: 'varchar', limit: 50 },
    email: { type: String, dataType: 'varchar', limit: 100 },
    password: { type: String, dataType: 'varchar', limit: 255 },
    hash: { type: String, dataType: 'varchar', limit: 255 },
    last_login: { type: Date, dataType: 'timestamp' },
};
