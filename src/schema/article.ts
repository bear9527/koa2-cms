const joi = require("joi")

const categoryName = joi.string().required()
const categoryAlias = joi.string().required()
const img = joi.string().allow('').allow(null)

const id = joi.number().integer().min(1).required()
const idNotRequired = joi.number().integer().min(1)

const article_title = joi.string().required()
const article_cate_id = joi.number().integer().min(1)
const article_description = joi.string().max(255)
const article_content = joi.string().required().allow('')
const article_state = joi.string().valid("已发布", "草稿").required()
const article_pic = joi.string().allow('')
const article_pub_date = joi.string()

// 创建分类
const articleCategorySchema = joi.object({
  title: categoryName,
  description: categoryAlias,
  img: article_pic,
  categoryId: id
});

// 编辑分类
const editCategorySchema = joi.object({
  id: id,
  title: categoryName,
  categoryId: id,
  description: categoryAlias,
  img: img,
});

// 删除分类
// const deleteCategorySchema = joi.object({
//   query:{
//     id: id
//   }
// });

// 删除分类
exports.article_id_category_schema = {
  params: {
    id
  }
}

const articleSchema = joi.object( {
  id: idNotRequired,
  title: article_title,
  description: article_description,
  content: article_content,
  categoryId: article_cate_id,
  articlePic: article_pic,
  // state: article_state,
  // pub_date: article_pub_date,
  // author_id: article_author_id,
})



module.exports = {
  articleCategorySchema,
  editCategorySchema,
  // deleteCategorySchema,
  articleSchema
};
