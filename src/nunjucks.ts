const nunjucks = require("nunjucks");

function createEnv(path: string, opts: any) {
  var autoescape = opts.autoescape === undefined ? true : opts.autoescape,
    noCache = opts.noCache || false,
    watch = opts.watch || false,
    throwOnUndefined = opts.throwOnUndefined || false,
    env = new nunjucks.Environment(
      new nunjucks.FileSystemLoader("views", {
        noCache: noCache,
        watch: watch,
      }),
      {
        autoescape: autoescape,
        throwOnUndefined: throwOnUndefined,
      }
    );
  if (opts.filters) {
    for (var f in opts.filters) {
      env.addFilter(f, opts.filters[f]);
    }
  }
  return env;
}

const nunjucksEnv = createEnv("views", {
  watch: true,
  filters: {
    hex: function (n: any) {
      return "0x" + n.toString(16);
    },
  },
});

module.exports = {
  nunjucksEnv
}
export {};