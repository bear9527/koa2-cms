"use strict";
function schema(method, schemas) {
    async function validateSchema(ctx, next) {
        let data = null;
        if (method === "get") {
            data = await ctx.request.query;
        }
        else {
            data = await ctx.request.body;
        }
        const { error } = schemas.validate(data);
        if (error) {
            return ctx.cc(error);
        }
        await next();
    }
    return validateSchema;
}
module.exports = schema;
//# sourceMappingURL=index.js.map