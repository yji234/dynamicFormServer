const dragdrop = require('../module/dragdrop.js');

const dragdropRouter = (router) => {
  // 增
  router.post('/dragdrop/add', async(ctx, next) => {
    const dragdropreq = ctx.request.body;
    dragdropreq.create_time = Date.now();
    await dragdrop.addcb(dragdropreq);
    ctx.body = {
      status: 200,
      message: '新增成功',
    };
    await next();
  })
  // 查
  router.get('/dragdrop/list', async(ctx, next) => {
    const result = await dragdrop.listcb();
    ctx.body = {
      status: 200,
      message: '查询成功',
      data: result,
    };
    await next();
  })
}

module.exports = dragdropRouter;
