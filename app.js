const Koa = require('koa');
const app = new Koa();
const Router = require('koa-router');
const router = new Router();
const cors = require('koa-cors');
const bodyParser = require('koa-bodyparser');
const userRouter = require('./router/user.js');
const formbaseRouter = require('./router/formbase.js');
const dragdropRouter = require('./router/dragdrop.js');
const formattrRouter = require('./router/formattr.js');

/**
 * Menu
*/
userRouter(router);

/**
 * Form Base
*/
formbaseRouter(router);

/**
 * Drag Drop
*/
dragdropRouter(router);

/**
 * Form Attr
*/
formattrRouter(router);






app.use(cors());
app.use(bodyParser());
app.use(router.routes());   /*启动路由*/
app.use(router.allowedMethods());
 
app.listen(8888);
