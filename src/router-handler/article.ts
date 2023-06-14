const { query } = require("../db/query");
const { formateDate } = require("../utils/tool");
const { staticBaseUrl } = require("../config");
const {
  GET_REPEAT,
  INSERT_DATA,
  UPDATE_DATA,
  GET_TABLE_INFO,
  UPDATE_DATAS,
  UPDATE_DATA_BY_IDS,
} = require("../db/sql");
// 新增分类
const addCategory = async (ctx: any, next: any) => {
  console.log("cateReapeatRes", ctx);
  const { title, description, categoryId, img } = ctx.request.body;
  if (!categoryId) {
    return ctx.cc("请输入categoryId！");
  }
  const cateReapeatRes = await query(
    GET_REPEAT("ev_article_cate", ["title", "description"]),
    [title, description]
  );
  if (cateReapeatRes.length > 0) {
    if (title === cateReapeatRes[0].title) {
      return ctx.cc("分类名重复,请重新输入！");
    }
    if (description === cateReapeatRes[0].description) {
      return ctx.cc("分类别名重复,请重新输入！");
    }
  }
  const cateAddRes = await query(
    INSERT_DATA(
      "ev_article_cate",
      "title, description, categoryId, img",
      `'${title}', '${description}', '${categoryId}', '${img}'`
    )
  );

  if (cateAddRes.affectedRows === 1) {
    return ctx.cc("创建成功", 0);
  } else {
    return ctx.cc("创建失败", cateAddRes);
  }
};

// 修改分类
const editCategory = async (ctx: any, next: any) => {
  const { id, description, categoryId, img, title } = ctx.request.body; //
  const cateReapeatRes = await query(GET_REPEAT("ev_article_cate", "id"), id);
  if (cateReapeatRes.length === 0) {
    return ctx.cc("未找到目标分类！");
  }

  const cateEditRes = await query(
    UPDATE_DATAS(
      "ev_article_cate",
      ["title", "description", "categoryId", "img"],
      id
    ),
    [title, description, categoryId, img]
  );
  if (cateEditRes.affectedRows === 1) {
    return ctx.cc("修改成功", 0);
  } else {
    return ctx.cc("修改失败", 1);
  }
};

// 删除分类
const deleteCategory = async (ctx: any) => {
  const { id } = ctx.query;
  const cateReapeatRes = await query(GET_REPEAT("ev_article_cate", "id"), id);
  if (cateReapeatRes.length === 0) {
    return ctx.cc("未找到目标分类！");
  }

  const cateDeleteRes = await query(
    UPDATE_DATA("ev_article_cate", id, "deleted", 1)
  );
  // const cateDeleteRes = await query(DELETE_DATA_BY_ID("ev_article_cate", id))
  if (cateDeleteRes.affectedRows === 1) {
    return ctx.cc("删除成功", 0);
  } else {
    return ctx.cc("删除失败", 1);
  }
};

// 批量删除分类
const batchDeleteCategory = async (ctx: any) => {
  const { ids } = ctx.request.body;

  const cateDeleteRes = await query(
    UPDATE_DATA_BY_IDS("ev_article_cate", "deleted", 1, ids)
  );
  if (cateDeleteRes.affectedRows > 0) {
    return ctx.cc("批量删除成功", 0);
  } else {
    return ctx.cc("批量删除失败", 1);
  }
};

// 查询某个路由分类下的所有分类
const getAllCategory = async (ctx: any) => {
  const { categoryId } = ctx.query;
  let cateReapeatRes = null;
  if (categoryId) {
    cateReapeatRes = await query(
      GET_TABLE_INFO("ev_article_cate", ["categoryId", "deleted"]),
      [categoryId, "0"]
    );
  } else {
    cateReapeatRes = await query(
      GET_TABLE_INFO("ev_article_cate", "deleted"),
      "0"
    );
  }

  if (cateReapeatRes.length === 0) {
    ctx.body = {
      message: "暂无数据",
      data: cateReapeatRes,
    };
    return;
  }
  let newData = cateReapeatRes.map((item: any) => {
    const preUrl =
      item.img && item.img.includes("http")
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

// 查询所有路由分类
const getAllRouterCategory = async (ctx: any) => {
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
const addArticle = async (ctx: any, next: any) => {
  const bodyData = ctx.request.body;
  if (!bodyData.categoryId) {
    return ctx.cc("请输入父id！");
  }

  const createUser = ctx.state.user.id;
  const state = "publish";
  const createDate = formateDate(new Date());
  const articleAddRes = await query(
    INSERT_DATA(
      "ev_articles ",
      "title, description, content, state, categoryId, articlePic, createDate, createUser",
      `'${bodyData.title}', 
      '${bodyData.description}', 
      '${bodyData.content}', 
      '${state}', 
      '${bodyData.categoryId}', 
      '${bodyData.articlePic}',
      '${createDate}',
      '${createUser}'`
    )
  );
  if (articleAddRes.affectedRows === 1) {
    return ctx.cc("创建成功", 0);
  } else {
    return ctx.cc("创建失败", articleAddRes);
  }
};

// 修改文章
const editArticle = async (ctx: any, next: any) => {
  const bodyData = ctx.request.body;
  if (!bodyData.categoryId) {
    return ctx.cc("请输入父id！");
  }

  const articleReapeatRes = await query(
    GET_TABLE_INFO("ev_articles", ["id", "deleted"]),
    [bodyData.id, "0"]
  );

  if (!articleReapeatRes.length) {
    return ctx.cc("没有找到要修改的文章id");
  }

  const updateUser = ctx.state.user.username || ctx.state.user.id;
  const updateDate = formateDate(new Date());
  const state = "publish";
  const articleAddRes = await query(
    UPDATE_DATAS(
      "ev_articles",
      [
        "title",
        "description",
        "content",
        "state",
        "categoryId",
        "articlePic",
        "createUser",
        "updateUser",
        "createDate",
        "updateDate",
      ],
      bodyData.id
    ),
    [
      bodyData.title,
      bodyData.description,
      bodyData.content,
      state,
      bodyData.categoryId,
      bodyData.articlePic,
      articleReapeatRes[0].createUser,
      updateUser,
      articleReapeatRes[0].createDate,
      updateDate,
    ]
  );
  if (articleAddRes.affectedRows === 1) {
    return ctx.cc("修改成功", 0);
  } else {
    return ctx.cc("修改失败", articleAddRes);
  }
};

// 查询某个分类下的所有文章
const getArticleList = async (ctx: any) => {
  const { categoryId } = ctx.query;
  let cateReapeatRes = null;
  if (categoryId) {
    cateReapeatRes = await query(
      GET_TABLE_INFO("ev_articles", ["categoryId", "deleted"]),
      [categoryId, "0"]
    );
  } else {
    cateReapeatRes = await query(GET_TABLE_INFO("ev_article", "deleted"), "0");
  }

  if (cateReapeatRes.length === 0) {
    ctx.body = {
      message: "暂无数据",
      data: cateReapeatRes,
    };
    return;
  }
  let newData = cateReapeatRes.map((item: any) => {
    const preUrl =
      item.articlePic && item.articlePic.includes("http")
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
  addCategory,
  editCategory,
  deleteCategory,
  getAllCategory,
  getAllRouterCategory,
  addArticle,
  batchDeleteCategory,
  getArticleList,
  editArticle,
};
export {};
