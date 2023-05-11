"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { query } = require("../db/query");
const { LOGIN, GET_REPEAT, SAVE_USER } = require("../db/sql");
const config = require("../config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const fn_index = async (ctx, next) => {
    await ctx.render("hello", {
        name: '<script>alert("小明")</script>',
        fruits: ["香蕉", "苹果", "火龙果"],
    });
    // ctx.response.body = '<script>alert("小明")</script>'
};
// 用户注册
const regUser = async (ctx, next) => {
    const { email, username } = ctx.request.body;
    const repeatResultUsername = await query(GET_REPEAT("users", ["username"]), [
        username,
    ]);
    if (repeatResultUsername.length) {
        return ctx.cc("用户名已经被人用了，再换一个吧！");
    }
    const repeatResultEmail = await query(GET_REPEAT("users", ["email"]), [
        email,
    ]);
    if (repeatResultEmail.length) {
        return ctx.cc("邮箱已注册！");
    }
    const userInfo = ctx.request.body;
    userInfo.password = bcrypt.hashSync(userInfo.password, 10);
    const result = await query(SAVE_USER(), userInfo);
    if (result.affectedRows !== 1) {
        return ctx.cc("注册失败");
    }
    ctx.cc("注册成功！", 0);
};
// 用户登录
const login = async (ctx, next) => {
    const username = ctx.request.body.username || "";
    const password = ctx.request.body.password || "";
    const result = await query(LOGIN(), username);
    if (!result.length)
        return ctx.cc("用户名不存在！！！");
    const compareResult = bcrypt.compareSync(password, result[0].password);
    if (!compareResult) {
        return ctx.cc("密码错误！！！");
    }
    const userInfo = { ...result[0], password: "", user_pic: "" };
    // 生成token
    const tokenStr = jwt.sign(userInfo, config.jwtSecretKey, {
        expiresIn: "1day",
    });
    ctx.response.body = {
        status: 0,
        message: "登录成功",
        data: "Bearer " + tokenStr,
    };
};
module.exports = {
    fn_index,
    regUser,
    login,
};
//# sourceMappingURL=user.js.map