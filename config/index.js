//
// Config File
//

var config = {};
//
// Declare Objects
//
config.orm = {};
config.web = {};
//
// Declare Configuration of Database
//

config.orm.host = 'localhost'; //Insert correct host here
config.orm.db = 'NodeBlog'; //Insert correct name of database
config.orm.user = 'root';//Insert correct user here
config.orm.pass = 'root'; //Insert correct pass here

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
