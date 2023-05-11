const { query } = require("../db/query");
// const { formateDate } = require("../utils/tool");
const {
  GET_REPEAT,
  INSERT_DATA,
  UPDATE_DATA,
  GET_TABLE_INFO,
  UPDATE_DATA9,
} = require("../db/sql");
// 新增分类
const addCategory = async (ctx: any, next: any) => {
  console.log('cateReapeatRes',ctx);
  const { name, alias, parentCategoryId } = ctx.request.body;
  if (!parentCategoryId) {
    return ctx.cc("请输入parentCategoryId！");
  }
  const cateReapeatRes = await query(
    GET_REPEAT("ev_article_cate", ["name", "alias"]),
    [name, alias]
  );
  if (cateReapeatRes.length > 0) {
    if (name === cateReapeatRes[0].name) {
      return ctx.cc("分类名重复,请重新输入！");
    }
    if (alias === cateReapeatRes[0].alias) {
      return ctx.cc("分类别名重复,请重新输入！");
    }
  }
  const cateAddRes = await query(
    INSERT_DATA(
      "ev_article_cate",
      "name, alias, cate_id",
      `'${name}', '${alias}', '${parentCategoryId}'`
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
  const { id } = ctx.request.body; //, alias, cate_id, img, name
  const cateReapeatRes = await query(GET_REPEAT("ev_article_cate", "id"), id);
  if (cateReapeatRes.length === 0) {
    return ctx.cc("未找到目标分类！");
  }

  // var UPDATE_DATA = (tableName: string, id: string, colum: string, value: string) =>
  // `UPDATE ${tableName} SET ${colum} = ${value} WHERE id = ${id};`;
console.log('111',UPDATE_DATA9("ev_article_cate" ,"name","ddd",18));

  const cateEditRes = await query(
    // UPDATE_DATA("ev_article_cate ", "name, alias, cate_id, img", `'${name}', '${alias}', '${cate_id}', '${img}'`)
    UPDATE_DATA9("ev_article_cate" ,"name","ddd",18)
    // UPDATE_DATA("ev_article_cate ", id ,`name`,name)
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
    UPDATE_DATA("ev_article_cate", id, "is_delete", 1)
  );
  // const cateDeleteRes = await query(DELETE_DATA_BY_ID("ev_article_cate", id))
  if (cateDeleteRes.affectedRows === 1) {
    return ctx.cc("删除成功", 0);
  } else {
    return ctx.cc("删除失败", 1);
  }
};

// 查询某个路由分类下的所有分类
const getAllCategory = async (ctx: any) => {
  const { categoryId } = ctx.query;
  let cateReapeatRes = null
  if(categoryId){
    cateReapeatRes = await query(
      GET_TABLE_INFO("ev_article_cate", ["cate_id", "is_delete"]),
      [categoryId, '0']
    );
  }else{
    cateReapeatRes = await query(
      GET_TABLE_INFO("ev_article_cate", "is_delete"),
      '0'
    );
  }

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

// 查询所有路由分类
const getAllRouterCategory = async (ctx: any) => {
  const cateReapeatRes = await query(
    GET_TABLE_INFO("ev_cate", "is_delete"),
    "0"
  );

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
  
  const author_id = ctx.state.user.id
  const state = '已发布'
  const articleAddRes = await query(
    INSERT_DATA(
      "ev_articles ",
      "title, description, content, state, categoryId, articlePic, author_id",
      `'${bodyData.title}', 
      '${bodyData.description}', 
      '${bodyData.content}', 
      '${state}', 
      '${bodyData.categoryId}', 
      '${bodyData.articlePic}',
      '${author_id}'`
    )
  );
  if (articleAddRes.affectedRows === 1) {
    return ctx.cc("创建成功", 0);
  } else {
    return ctx.cc("创建失败", articleAddRes);
  }
};

module.exports = {
  addCategory,
  editCategory,
  deleteCategory,
  getAllCategory,
  getAllRouterCategory,
  addArticle,
};
export {};
