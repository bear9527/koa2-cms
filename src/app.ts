const Koa = require("koa");
const koabody = require("koa-body");
// const controller = require("./controller")
const userRouter = require("./router/index");
const nunjucks = require("koa-nunjucks-2");
const path = require("path");
const cors = require("@koa/cors");
const koaJwt = require("koa-jwt");
const config = require("./config");
const app = new Koa();
app.use(cors());
app.use(
  nunjucks({
    ext: "html",
    path: path.join(__dirname, "views"),
    nunjucksConfig: {
      trimBlocks: true,
      watch: true,
    },
  })
);

app.use(async (ctx: any, next: any) => {
  console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
  ctx.cc = (err: any, status = 1) => {
    ctx.response.body = {
      status: status,
      message: err instanceof Error ? err.message : err,
    };
  };
  await next().catch((err: any) => {
    if (401 == err.status) {
      ctx.status = 401;
      ctx.body = {
        code: 401,
        message: "Protected resource, use Authorization header to get access\n",
      };
    } else {
      ctx.status = err.status || 500;
      console.log("err", err);
      ctx.body = Object.assign(
        {
          code: 500,
          message: err.message,
        },
        process.env.NODE_ENV === "development" ? { stack: err.stack } : {}
      );
    }
  });
  // ctx.response.status = 403;
});
app.use(
  koabody({
    multipart: true, //支持图片文件
    formidable: {
      uploadDir: path.join(__dirname, "/public/uploads"), //设置上传目录
      keepExtensions: true, //保留拓展名
    },
  })
);
const koaStatic=require('koa-static')
app.use(koaStatic(path.join(__dirname, 'public')))

app.use(koaJwt({ secret: config.jwtSecretKey }).unless({ path: [/^\/user/,/^\/public/] }));
// app.use(controller())
// app.use(userRouter.routes()); // 启动路由
userRouter(app);
let server = app.listen(9000);
console.log("http://localhost:" + 9000);
// export {}; // 为了解决报相同变量名问题所加



