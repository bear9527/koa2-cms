"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Router = require('koa-router');
const router = new Router({ prefix: "/article" });
const articleHandler = require("../router-handler/article");
// 导入 Joi 来定义验证规则
const schema = require("../schema");
const { articleCategorySchema, editCategorySchema, articleSchema } = require("../schema/article");
// 注册新用户
// 添加分类
router.post('/addCategory', schema('post', articleCategorySchema), articleHandler.addCategory);
// 修改分类
router.post('/editCategory', schema('post', editCategorySchema), articleHandler.editCategory);
// 删除分类
router.get('/deleteCategory', articleHandler.deleteCategory);
// 批量删除分类
router.post('/batchDeleteCategory', articleHandler.batchDeleteCategory);
// 查看所有分类
router.get('/getAllCategory', articleHandler.getAllCategory);
// 查看所有路由分类
router.get('/getAllRouterCategory', articleHandler.getAllRouterCategory);
// 添加某个分类下的文章
router.post('/addArticle', schema('post', articleSchema), articleHandler.addArticle);
// 修改某个分类下的文章
router.post('/editArticle', schema('post', articleSchema), articleHandler.editArticle);
// 查询某个分类下的文章
router.get('/getArticleList', articleHandler.getArticleList);
module.exports = router;
//# sourceMappingURL=article.js.map