const linkMongo = require('./db.js');
const ObjectID = require('mongodb').ObjectID;

// 增
const addList = (params) => {
  return new Promise((resolve) => {
    linkMongo.then((db) => {
      db.collection("formvalue").insertOne(params, (err) => {
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
  return new Promise((resolve) => {
    linkMongo.then((db) => {
      db.collection("formvalue").deleteOne({_id: ObjectID(_id)}, (err, obj) => {
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
    delete params._id;
    linkMongo.then((db) => {
      db.collection("formvalue").updateOne({_id: ObjectID(_id)}, {$set: params}, (err) => {
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
const getList = (formId) => {
  return new Promise((resolve) => {
    linkMongo.then((db) => {
      db.collection("formvalue").find({formId}).toArray((err, result) => {
        if (err) {
          throw err;
        }
        resolve(result);
      });
    })
  })
}
const listcb = async(formId) => {
  let result = [];
  await getList(formId).then((res) => {
    result = res;
  })
  return result;
}

// 查值
const getValue = (_id) => {
  return new Promise((resolve) => {
    linkMongo.then((db) => {
      db.collection("formvalue").find({_id: ObjectID(_id)}).toArray((err, result) => {
        if (err) {
          throw err;
        }
        resolve(result);
      });
    })
  })
}
const valuecb = async(_id) => {
  let result = [];
  await getValue(_id).then((res) => {
    result = res;
  })
  return result;
}

const form = {
  addcb,
  deletecb,
  updatecb,
  listcb,
  valuecb,
}

module.exports = form;
