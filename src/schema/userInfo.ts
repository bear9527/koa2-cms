const joi = require("joi");
/*** string() 值必须是字符串 * alphanum() 值只能是包含 a-zA-Z0-9 的字符串 * min(length) 最小长度 * max(length) 最大长度 * required() 值是必填项，不能为 undefined * pattern(正则表达式) 值必须符合正则表达式的规则 */

const password = joi
  .string()
  .pattern(/^[\S]{6,12}$/)
  .required();

// const id = joi.number().integer().min(1).required();
// const nickname = joi.string().required();
// const email = joi.string().email().required();

// const avatar = joi.string().dataUri().required();
const resetPwd = joi.object({
  oldPwd: password,
  newPwd: password,
});
module.exports = {
  resetPwd
};


export {}