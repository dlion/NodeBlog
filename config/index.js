//
// Config File
//

var config = {}
//
// Declare Objects
//
config.jugglingdb = {};
config.web = {};
//
// Declare Configuration of Database
//
config.jugglingdb.host = 'localhost';
config.jugglingdb.port = //Insert correct port here
config.jugglingdb.user = 'root' //Insert correct user here
config.jugglingdb.pass = 'root' //Insert correct pass here
config.jugglingdb.db = 'NodeBlog_DB' //Insert correct name of database
//
// Declare Configuration of WebApp
//
config.web.namesite = 'NodeBlog';
config.web.port = 3000;
config.web.admin = ['DLion','unsign3d'];
config.web.secret_cookie = "NodeBlogIsFuckingAwesome";
module.exports = config;
