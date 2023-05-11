function schema(method: string, schemas: any) {
  async function validateSchema(ctx: any, next: any) {
    let data = null;
    if (method === "get") {
      data = await ctx.request.query;
    } else {
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