const form = require('../module/form.js');

const formRouter = (router) => {
  // 增
  router.post('/form/add', async(ctx, next) => {
    const menu = ctx.request.body;
    menu.create_time = Date.now();
    await form.addcb(menu);
    ctx.body = {
      status: 200,
      message: '新增成功',
    };
    await next();
  })
  // 删
  router.delete('/form/delete/:_id', async(ctx, next) => {
    const { _id } = ctx.params;
    await form.deletecb(_id);
    ctx.body = {
      status: 200,
      message: '删除成功',
    };
    await next();
  })
  // 改
  router.post('/form/update', async(ctx, next) => {
    const { _id } = ctx.request.body
    await form.updatecb(_id, ctx.request.body);
    ctx.body = {
      status: 200,
      message: '修改成功',
    };
    await next();
  })
  // 查列表
  router.get('/form/list/:formId', async(ctx, next) => {
    const { formId } = ctx.params;
    const result = await form.listcb(formId);
    ctx.body = {
      status: 200,
      message: '查询成功',
      data: result,
    };
    await next();
  })
  // 查值
  router.get('/form/value/:_id', async(ctx, next) => {
    const { _id } = ctx.params;
    const result = await form.valuecb(_id);
    ctx.body = {
      status: 200,
      message: '查询成功',
      data: result,
    };
    await next();
  })
}

module.exports = formRouter;
