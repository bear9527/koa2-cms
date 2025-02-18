"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Router = require('koa-router');
const router = new Router({ prefix: "/my" }); // 路由前缀
const userHandler = require("../router-handler/userInfo");
// 导入 Joi 来定义验证规则
const schema = require("../schema");
const { resetPwd } = require("../schema/userInfo");
// 重置密码
router.post('/resetPwd', schema('post', resetPwd), userHandler.resetPwd);
// 查询当前用户信息
router.get('/userInfo', userHandler.userInfo);
// 获取
// router.get('/getList', userHandler.getList)
module.exports = router;
//# sourceMappingURL=userInfo.js.map