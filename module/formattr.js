const linkMongo = require('./db.js');
const ObjectID = require('mongodb').ObjectID;

// 增
const addItem = (params) => {
  return new Promise((resolve) => {
    linkMongo.then((db) => {
      params.create_time = Date.now();
      db.collection("formattr").insertOne(params, (err) => {
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
  await addItem(params).then((res) => {
    result = res;
  })
  return result;
}

// 删
const deleteItem = (_id) => {
  return new Promise((resolve) => {
    linkMongo.then((db) => {
      console.log('ObjectID(_id)', ObjectID(_id));
      db.collection("formattr").deleteOne({_id: ObjectID(_id)}, (err) => {
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
  await deleteItem(_id).then((res) => {
    result = res;
  })
  return result;
}

// 改
const updateItem = (_id, params) => {
  return new Promise((resolve) => {
    delete params._id;
    linkMongo.then((db) => {
      db.collection("formattr").updateOne({_id: ObjectID(_id)}, {$set: params}, (err) => {
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
  await updateItem(_id, params).then((res) => {
    result = res;
  })
  return result;
}

// 查
const getList = (parentId) => {
  return new Promise((resolve) => {
    linkMongo.then((db) => {
      db.collection("formattr").find({parentId}).toArray((err, result) => {
        if (err) {
          throw err;
        }
        resolve(result);
      });
    })
  })
}
const listcb = async(parentId) => {
  let result = [];
  await getList(parentId).then((res) => {
    result = res;
  })
  return result;
}

// 查某一条formItem
const getItem = (_id) => {
  return new Promise((resolve) => {
    linkMongo.then((db) => {
      db.collection("formattr").find({_id: ObjectID(_id)}).toArray((err, result) => {
        if (err) {
          throw err;
        }
        resolve(result);
      });
    })
  })
}
const itemcb = async(_id) => {
  let result = [];
  await getItem(_id).then((res) => {
    result = res;
  })
  return result;
}

const formattr = {
  addcb,
  deletecb,
  updatecb,
  listcb,
  itemcb,
}

module.exports = formattr;
