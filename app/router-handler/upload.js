"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// const { query } = require("../db/query")
// const { GET_TABLE_INFO, GET_REPEAT, UPDATE_USER_INFO } = require("../db/sql")
// const bcrypt = require("bcryptjs")
const path = require('path');
const upload = async (ctx, next) => {
    console.log('upload', ctx.request.files);
    const { name, size, type } = ctx.request.files.file;
    const basename = path.basename(ctx.request.files.file.path); //传入绝对路径返回的basename为文件名称+拓展
    console.log('upload basename', basename);
    ctx.body = {
        name,
        // url: `${ctx.origin}/uploads/${basename}`, // 路径
        url: `/uploads/${basename}`,
        path: `/uploads/${basename}`,
        origin: ctx.origin,
        size,
        type // 文件类型
    };
};
module.exports = {
    upload
};
//# sourceMappingURL=upload.js.map