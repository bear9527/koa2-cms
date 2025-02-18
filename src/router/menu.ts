const Router = require('koa-router');
const router = new Router({ prefix: "/menu" });
const menuHandler = require("../router-handler/menu"); // 数据库的操作

// 导入 Joi 来定义验证规则
const schema = require("../schema");
const { addMenuSchema, editMenuSchema } = require("../schema/menu")

// 添加分类
router.post('/addMenu', schema('post', addMenuSchema), menuHandler.addMenu)


// 修改分类
router.post('/editMenu', schema('post', editMenuSchema), menuHandler.editMenu)

// // 删除分类
// router.get('/deleteMenu', articleHandler.deleteMenu)

// // 批量删除分类
// router.post('/batchDeleteMenu', articleHandler.batchDeleteMenu)

// 查看所有分类
router.get('/getMenus', menuHandler.getMenus)
router.get('/getMenuInfo', menuHandler.getMenuInfo)

// // 查看所有路由分类
// router.get('/getAllRouterMenu', articleHandler.getAllRouterMenu)


// // 添加某个分类下的文章
// router.post('/addArticle', schema('post', articleSchema), articleHandler.addArticle)

// // 修改某个分类下的文章
// router.post('/editArticle', schema('post', articleSchema), articleHandler.editArticle)

// // 查询某个分类下的文章
// router.get('/getArticleList', articleHandler.getArticleList)

module.exports = router
export {}