//
// Config File
//

var config = {};
//
// Declare Objects
//
config.jugglingdb = {};
config.web = {};
//
// Declare Configuration of Database
//
config.jugglingdb.user = 'root';//Insert correct user here
config.jugglingdb.pass = 'root'; //Insert correct pass here
config.jugglingdb.db = 'NodeBlog_db'; //Insert correct name of database
//
// Declare Configuration of WebApp
//
config.web.namesite = 'NodeBlog';
config.web.port = 3000;
config.web.admin = ['DLion','unsign3d'];
config.web.secret_cookie = "NodeBlogIsFuckingAwesome";
config.web.secret_session = "NodeBlogIsMoreFuckinAwesomeThanYou";
config.web.secret_salt = "NodeBlogSaltPass";
//
// Exports
//
module.exports = config;
