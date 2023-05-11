const Router = require('koa-router');
const router = new Router({ prefix: "/user" });
const userHandler = require("../router-handler/user")

// 导入 Joi 来定义验证规则
const schema = require("../schema");
const { user, regUser } = require("../schema/user")
// 注册新用户

// 登录
router.post('/login', schema('post', user), userHandler.login)

router.post('/regUser', schema('post', regUser), userHandler.regUser)

// 获取
// router.get('/getList', userHandler.getList)

module.exports = router
export {}