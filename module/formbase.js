const linkMongo = require('./db.js');
const ObjectID = require('mongodb').ObjectID;

// 增
const addList = (params) => {
  return new Promise((resolve) => {
    linkMongo.then((db) => {
      db.collection("formbase").insertOne(params, (err, obj) => {
        if (err) {
          throw err;
        }
        resolve(obj.ops[0]._id);
      });
    })
  })
}
const addcb = async(params) => {
  let result;
  await addList(params).then((res) => {
    result = res;
  })
  return result;
}

// 删
const deleteList = (_id) => {
  return new Promise((resolve) => {
    linkMongo.then((db) => {
      db.collection("formbase").deleteOne({_id: ObjectID(_id)}, (err) => {
        if (err) {
          throw err;
        }
        resolve(1);
      });
    })
  })
}
const deletecb = async(_id) => {
  let result;
  await deleteList(_id).then((res) => {
    result = res;
  })
  return result;
}

// 改
const updateList = (_id, params) => {
  return new Promise((resolve) => {
    linkMongo.then((db) => {
      db.collection("formbase").updateOne({_id: ObjectID(_id)}, {$set: params}, (err) => {
        if (err) {
          throw err;
        }
        resolve(1);
      });
    })
  })
}
// 修改所有数据
const updatecb = async(_id, params) => {
  let result;
  const updateParams = {
    name: params.name,
    desc: params.desc,
    status: params.status,  // true 启用  false 禁用
    update_time: Date.now(),
  };
  await updateList(_id, updateParams).then((res) => {
    result = res;
  })
  return result;
}
// 仅修改状态
const updateStatuscb = async(_id, params) => {
  let result;
  const updateParams = {
    status: params.status === 'false' ? false : true,  // true 启用  false 禁用
  };
  await updateList(_id, updateParams).then((res) => {
    result = res;
  })
  return result;
}

// 查
const getList = () => {
  return new Promise((resolve) => {
    linkMongo.then((db) => {
      db.collection("formbase").find({}).toArray((err, result) => {
        if (err) {
          throw err;
        }
        resolve(result);
      });
    })
  })
}
const listcb = async() => {
  let result = [];
  await getList().then((res) => {
    result = res;
  })
  return result;
}

const formbase = {
  addcb,
  deletecb,
  updatecb,
  updateStatuscb,
  listcb,
}

module.exports = formbase;
