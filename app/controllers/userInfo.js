"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { query } = require("../db/query");
const { GET_TABLE_INFO, GET_REPEAT, UPDATE_USER_INFO } = require("../db/sql");
const bcrypt = require("bcryptjs");
const fn_hello = async (ctx, next) => {
    const name = ctx.params.name || '';
    console.log('name', name);
    const res = await query(GET_TABLE_INFO("users", 'username'), name);
    res.length ? ctx.response.body = res[0] : ctx.cc("查无此人");
};
// 重置密码
const fn_resetPwd = async (ctx, next) => {
    const { oldPwd, newPwd } = ctx.request.body;
    if (!oldPwd && !newPwd) {
        return ctx.cc("请输入必填项");
    }
    else if (oldPwd === newPwd) {
        return ctx.cc("新密码不能和旧密码相同！");
    }
    const result = await query(GET_REPEAT("users", "username"), ctx.state.user.username);
    if (result.length) {
        const compareResult = bcrypt.compareSync(oldPwd, result[0].password);
        if (!compareResult) {
            return ctx.cc("旧密码错误！！！");
        }
        const newPwdStr = bcrypt.hashSync(newPwd, 10);
        const resultUpdatePWD = await query(UPDATE_USER_INFO("password", "id"), [newPwdStr, ctx.state.user.id]);
        if (resultUpdatePWD.affectedRows < 1) {
            return ctx.cc("修改密码错误！！！");
        }
        ctx.response.body = {
            status: 0,
            message: "密码修改成功！"
        };
    }
};
const prefix = '/my';
module.exports = {
    [`GET ${prefix}/userInfo/:name`]: fn_hello,
    [`POST ${prefix}/resetPwd`]: fn_resetPwd
};
//# sourceMappingURL=userInfo.js.map