"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { query } = require("../db/query");
const { formateDate } = require("../utils/tool");
const { staticBaseUrl } = require("../config");
const { GET_REPEAT, INSERT_DATA, UPDATE_DATA, GET_TABLE_INFO, UPDATE_DATAS, UPDATE_DATA_BY_IDS, } = require("../db/sql");
// 新增菜单
const addMenu = async (ctx, next) => {
    console.log("addMenu", ctx);
    const { title, description, parentId, img } = ctx.request.body;
    const defaultParentId = 1;
    // if (!parentId) {
    //   return ctx.cc("请输入parentId！");
    // }
    const cateReapeatRes = await query(GET_REPEAT("ev_menus", ["title"]), [title]);
    if (cateReapeatRes.length > 0) {
        if (title === cateReapeatRes[0].title) {
            return ctx.cc("菜单名重复,请重新输入！");
        }
        // if (description === cateReapeatRes[0].description) {
        //   return ctx.cc("分类别名重复,请重新输入！");
        // }
    }
    const cateAddRes = await query(INSERT_DATA("ev_menus", "title, description, parentId, img", `'${title}', '${description}', '${parentId || defaultParentId}', '${img}'`));
    if (cateAddRes.affectedRows === 1) {
        return ctx.cc("创建成功", 0);
    }
    else {
        return ctx.cc("创建失败", cateAddRes);
    }
};
// 查询所有菜单
const getMenus = async (ctx) => {
    const { parentId } = ctx.query;
    let menuReapeatRes = null;
    if (parentId) {
        menuReapeatRes = await query(GET_TABLE_INFO("ev_menus", ["parentId", "deleted"]), [parentId, "0"]);
    }
    else {
        menuReapeatRes = await query(GET_TABLE_INFO("ev_menus", "deleted"), 0);
        console.log('menuReapeatRes', menuReapeatRes);
    }
    if (menuReapeatRes.length === 0) {
        ctx.body = {
            message: "暂无数据",
            data: menuReapeatRes,
        };
        return;
    }
    let newData = menuReapeatRes.map((item) => {
        const preUrl = item.img && item.img.includes("http")
            ? item.img
            : staticBaseUrl + item.img;
        return {
            ...item,
            img: item.img ? preUrl : item.img,
        };
    });
    ctx.body = {
        message: "成功",
        data: newData,
    };
};
// 查询某个菜单信息
const getMenuInfo = async (ctx, next) => {
    const { id } = ctx.request.body; //
    console.log('id', id);
    const cateReapeatRes = await query(GET_REPEAT("ev_menus", "id"), id);
    if (cateReapeatRes.length === 0) {
        return ctx.cc("未找到对应ID的菜单！");
    }
    else {
        ctx.body = {
            message: "成功",
            data: cateReapeatRes,
        };
    }
};
// 修改分类
const editMenu = async (ctx, next) => {
    const { id, description, parentId, img, title } = ctx.request.body; //
    const cateReapeatRes = await query(GET_REPEAT("ev_menus", "id"), id);
    if (cateReapeatRes.length === 0) {
        return ctx.cc("未找到目标分类！");
    }
    const cateEditRes = await query(UPDATE_DATAS("ev_menus", ["title", "description", "parentId", "img"], id), [title, description, parentId, img]);
    if (cateEditRes.affectedRows === 1) {
        return ctx.cc("修改成功", 0);
    }
    else {
        return ctx.cc("修改失败", 1);
    }
};
// 删除分类
const deleteCategory = async (ctx) => {
    const { id } = ctx.query;
    const cateReapeatRes = await query(GET_REPEAT("ev_menus", "id"), id);
    if (cateReapeatRes.length === 0) {
        return ctx.cc("未找到目标分类！");
    }
    const cateDeleteRes = await query(UPDATE_DATA("ev_menus", id, "deleted", 1));
    // const cateDeleteRes = await query(DELETE_DATA_BY_ID("ev_menus", id))
    if (cateDeleteRes.affectedRows === 1) {
        return ctx.cc("删除成功", 0);
    }
    else {
        return ctx.cc("删除失败", 1);
    }
};
// 批量删除分类
const batchDeleteCategory = async (ctx) => {
    const { ids } = ctx.request.body;
    const cateDeleteRes = await query(UPDATE_DATA_BY_IDS("ev_menus", "deleted", 1, ids));
    if (cateDeleteRes.affectedRows > 0) {
        return ctx.cc("批量删除成功", 0);
    }
    else {
        return ctx.cc("批量删除失败", 1);
    }
};
// 查询所有路由分类
const getAllRouterCategory = async (ctx) => {
    const cateReapeatRes = await query(GET_TABLE_INFO("ev_cate", "deleted"), "0");
    if (cateReapeatRes.length === 0) {
        ctx.body = {
            message: "暂无数据",
            data: cateReapeatRes,
        };
        return;
    }
    ctx.body = {
        message: "成功",
        data: cateReapeatRes,
    };
};
// 文章部分
// 新增分类文章
const addArticle = async (ctx, next) => {
    const bodyData = ctx.request.body;
    if (!bodyData.parentId) {
        return ctx.cc("请输入父id！");
    }
    const createUser = ctx.state.user.id;
    const state = "publish";
    const createDate = formateDate(new Date());
    const articleAddRes = await query(INSERT_DATA("ev_articles ", "title, description, content, state, parentId, articlePic, createDate, createUser", `'${bodyData.title}', 
      '${bodyData.description}', 
      '${bodyData.content}', 
      '${state}', 
      '${bodyData.parentId}', 
      '${bodyData.articlePic}',
      '${createDate}',
      '${createUser}'`));
    if (articleAddRes.affectedRows === 1) {
        return ctx.cc("创建成功", 0);
    }
    else {
        return ctx.cc("创建失败", articleAddRes);
    }
};
// 修改文章
const editArticle = async (ctx, next) => {
    const bodyData = ctx.request.body;
    if (!bodyData.parentId) {
        return ctx.cc("请输入父id！");
    }
    const articleReapeatRes = await query(GET_TABLE_INFO("ev_articles", ["id", "deleted"]), [bodyData.id, "0"]);
    if (!articleReapeatRes.length) {
        return ctx.cc("没有找到要修改的文章id");
    }
    const updateUser = ctx.state.user.username || ctx.state.user.id;
    const updateDate = formateDate(new Date());
    const state = "publish";
    const articleAddRes = await query(UPDATE_DATAS("ev_articles", [
        "title",
        "description",
        "content",
        "state",
        "parentId",
        "articlePic",
        "createUser",
        "updateUser",
        "createDate",
        "updateDate",
    ], bodyData.id), [
        bodyData.title,
        bodyData.description,
        bodyData.content,
        state,
        bodyData.parentId,
        bodyData.articlePic,
        articleReapeatRes[0].createUser,
        updateUser,
        articleReapeatRes[0].createDate,
        updateDate,
    ]);
    if (articleAddRes.affectedRows === 1) {
        return ctx.cc("修改成功", 0);
    }
    else {
        return ctx.cc("修改失败", articleAddRes);
    }
};
// 查询某个分类下的所有文章
const getArticleList = async (ctx) => {
    const { parentId } = ctx.query;
    let cateReapeatRes = null;
    if (parentId) {
        cateReapeatRes = await query(GET_TABLE_INFO("ev_articles", ["parentId", "deleted"]), [parentId, "0"]);
    }
    else {
        cateReapeatRes = await query(GET_TABLE_INFO("ev_article", "deleted"), "0");
    }
    if (cateReapeatRes.length === 0) {
        ctx.body = {
            message: "暂无数据",
            data: cateReapeatRes,
        };
        return;
    }
    let newData = cateReapeatRes.map((item) => {
        const preUrl = item.articlePic && item.articlePic.includes("http")
            ? item.articlePic
            : staticBaseUrl + item.articlePic;
        return {
            ...item,
            articlePic: item.articlePic ? preUrl : item.articlePic,
        };
    });
    ctx.body = {
        message: "成功",
        data: newData,
    };
};
module.exports = {
    addMenu,
    editMenu,
    getMenuInfo,
    deleteCategory,
    getMenus,
    getAllRouterCategory,
    addArticle,
    batchDeleteCategory,
    getArticleList,
    editArticle,
};
//# sourceMappingURL=menu.js.map