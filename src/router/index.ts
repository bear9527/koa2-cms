const fs = require("fs");
/*
自动读取文件模块
*/
module.exports = (app: any) => {
  // 同步读取文件
  fs.readdirSync(__dirname).forEach((file: string) => {
    if ((file).startsWith('index')) {
      return;
    }
    const route = require(`./${file}`);
    // 注册路由 响应options
    app.use(route.routes()).use(route.allowedMethods());
  });
};

export {};
