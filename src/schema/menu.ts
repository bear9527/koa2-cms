const _joi = require("joi");

const menuTitle = _joi.string().required()
const menuDescription = _joi.string()
const _img = _joi.string().allow('').allow(null)

const _id = _joi.number().integer().min(1).required()
const _pid = _joi.number().integer().min(1)
const _idNotRequired = _joi.number().integer().min(1)

// const article_title = joi.string().required()
// const article_cate_id = joi.number().integer().min(1)
// const article_description = joi.string().max(255)
// const article_content = joi.string().required().allow('')
// const article_state = joi.string().valid("已发布", "草稿").required()
// const article_pic = joi.string().allow('')
// const article_pub_date = joi.string()

// 创建
const addMenuSchema = _joi.object({
  title: menuTitle,
  description: menuDescription,
  img: _img,
  parentId: _pid
});

// 编辑
const editMenuSchema = _joi.object({
  id: _id,
  title: menuTitle, 
  parentId: _id,
  description: menuDescription,
  img: _img,
});

// 删除
// const deleteCategorySchema = joi.object({
//   query:{
//     id: id
//   }
// });

// // 删除分类
// exports.article_id_category_schema = {
//   params: {
//     id
//   }
// }



module.exports = {
  addMenuSchema,
  editMenuSchema,
  // deleteCategorySchema,
};
