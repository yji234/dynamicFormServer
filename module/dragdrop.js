const linkMongo = require('./db.js');

// 增
const addList = (params) => {
  return new Promise((resolve) => {
    linkMongo.then((db) => {
      db.collection("dragdrop").insertOne(params, (err) => {
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

// 查
const getList = () => {
  return new Promise((resolve) => {
    linkMongo.then((db) => {
      db.collection("dragdrop").find({}).toArray((err, result) => {
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

const dragdrop = {
  addcb,
  listcb,
}

module.exports = dragdrop;
