const user = require('../module/user.js');

const userRouter = (router) => {
  // 增
  router.post('/menu/add', async(ctx, next) => {
    const menu = ctx.request.body;
    menu.create_time = Date.now();
    await user.addcb(menu);
    ctx.body = {
      status: 200,
      message: '新增成功',
    };
    await next();
  })
  // 删
  router.delete('/menu/delete/:_id', async(ctx, next) => {
    const { _id } = ctx.params;
    await user.deletecb(_id);
    ctx.body = {
      status: 200,
      message: '删除成功',
    };
    await next();
  })
  // 改
  router.post('/menu/update', async(ctx, next) => {
    const { _id } = ctx.request.body
    await user.updatecb(_id, ctx.request.body);
    ctx.body = {
      status: 200,
      message: '修改成功',
    };
    await next();
  })
  // 查
  router.get('/menu/list', async(ctx, next) => {
    const result = await user.listcb();
    ctx.body = {
      status: 200,
      message: '查询成功',
      data: result,
    };
    await next();
  })
}

module.exports = userRouter;
