const formattr = require('../module/formattr.js');

const formattrRouter = (router) => {
  // 增
  router.post('/form/attr/add', async(ctx, next) => {
    const parentId = ctx.request.body.parentId;
    const formattrreq = JSON.parse(ctx.request.body.forms);
    formattrreq.forEach(async(item) => {
      item.parentId = parentId;
      item.create_time = Date.now();
      await formattr.addcb(item);
    })
    ctx.body = {
      status: 200,
      message: '新增成功',
    };
    await next();
  })
  // 删
  router.delete('/form/attr/delete/:_id', async(ctx, next) => {
    const { _id } = ctx.params;
    await formattr.deletecb(_id);
    ctx.body = {
      status: 200,
      message: '删除成功',
    };
    await next();
  })
  // 改
  router.post('/form/attr/update', async(ctx, next) => {
    const parentId = ctx.request.body.parentId;
    const formattrreq = JSON.parse(ctx.request.body.forms);
    formattrreq.forEach(async(item) => {
      // 查询下当前表单item是否已经在数据库中存在
      const result = await formattr.itemcb(item._id);
      // 若存在，则修改
      if(result.length > 0) {
        await formattr.updatecb(item._id, item);
      } else {
        // 若不存在，则添加
        item.parentId = parentId;
        await formattr.addcb(item);
      }
    })
    ctx.body = {
      status: 200,
      message: '修改成功',
    };
    await next();
  })
  // 查
  router.get('/form/attr/list/:parentId', async(ctx, next) => {
    const { parentId } = ctx.params;
    const result = await formattr.listcb(parentId);
    ctx.body = {
      status: 200,
      message: '查询成功',
      data: result,
    };
    await next();
  })
}

module.exports = formattrRouter;
