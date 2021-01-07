const formbase = require('../module/formbase.js');

const formbaseRouter = (router) => {
  // 增/改
  router.post('/form/add', async(ctx, next) => {
    const { _id } = ctx.request.body
    let result;
    if(_id) {
      const formbasereq = ctx.request.body;
      formbasereq.update_time = Date.now();
      await formbase.updatecb(_id, ctx.request.body);
    } else {
      const formbasereq = ctx.request.body;
      formbasereq.create_time = Date.now();
      result = await formbase.addcb(formbasereq);
    }
    // console.log('result', result);
    ctx.body = {
      status: 200,
      message: '成功',
      data: {
        parentId: result || _id,
      },
    };
    await next();
  })
  // 删
  router.delete('/form/delete/:_id', async(ctx, next) => {
    const { _id } = ctx.params;
    await formbase.deletecb(_id);
    ctx.body = {
      status: 200,
      message: '删除成功',
    };
    await next();
  })
  // 改状态
  router.get('/form/update/status/:id/:status', async(ctx, next) => {
    const { id, status } = ctx.params;
    await formbase.updateStatuscb(id, {status});
    ctx.body = {
      status: 200,
      message: '修改成功',
    };
    await next();
  })
  // 查
  router.get('/form/list', async(ctx, next) => {
    const result = await formbase.listcb();
    ctx.body = {
      status: 200,
      message: '查询成功',
      data: result,
    };
    await next();
  })
}

module.exports = formbaseRouter;
