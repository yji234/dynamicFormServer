const linkMongo = require('./db.js');
const ObjectID = require('mongodb').ObjectID;

// 增
const addList = (params) => {
  return new Promise((resolve) => {
    linkMongo.then((db) => {
      db.collection("user").insertOne(params, (err) => {
        if (err) {
          throw err;
        }
        resolve(1);
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
  // _id是子菜单：只删除本身即可
  // _id是父菜单：删除本身以及自己的子菜单
  return new Promise((resolve) => {
    linkMongo.then((db) => {
      db.collection("user").deleteMany({parentId: _id}, function(err, obj) {
        if (err) {
          throw err;
        }
        // console.log(obj.result.n + " 条子菜单数据被删除");
        db.collection("user").deleteOne({_id: ObjectID(_id)}, (err, obj) => {
          if (err) {
            throw err;
          }
          // console.log("自己被删除");
          resolve(1);
        });
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
    const updateParams = {$set: {
      name: params.name,
      to: params.to,
      jumpTo: params.jumpTo || '',
      formIdType: params.formIdType || '',
      formId: params.formId || '',
      update_time: Date.now(),
    }};
    linkMongo.then((db) => {
      db.collection("user").updateOne({_id: ObjectID(_id)}, updateParams, (err) => {
        if (err) {
          throw err;
        }
        resolve(1);
      });
    })
  })
}
const updatecb = async(_id, params) => {
  let result;
  await updateList(_id, params).then((res) => {
    result = res;
  })
  return result;
}

// 查
const getList = () => {
  return new Promise((resolve) => {
    linkMongo.then((db) => {
      db.collection("user").find({}).toArray((err, result) => {
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

const user = {
  addcb,
  deletecb,
  updatecb,
  listcb,
}

module.exports = user;
