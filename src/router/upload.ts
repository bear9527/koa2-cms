const Router = require('koa-router');
const router = new Router({ prefix: "/common" })
const uploadHandler = require("../router-handler/upload")

router.post('/upload', uploadHandler.upload)

module.exports = router