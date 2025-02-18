const { query } = require("../db/query")
const { GET_TABLE_INFO, GET_REPEAT, UPDATE_USER_INFO } = require("../db/sql")

// 获取登录用户的信息
const userInfo = async (ctx: any, next: any) => {
  const res = await query(GET_TABLE_INFO("users", 'username'), ctx.state.user.username)
  res.length ? ctx.response.body = res[0] : ctx.cc("查无此人")
}


module.exports = {
  userInfo,
}
export {}