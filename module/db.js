const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://127.0.0.1:27017/dynamicforms";

const linkMongo = () => {
  return new Promise((resolve) => {
    MongoClient.connect(url, (err, db) => {
      if (err) {
        throw err;
      }
      const dbase = db.db("dynamicforms");
      console.log('数据库连接成功！');
      resolve(dbase);
    })
  })
}

module.exports = linkMongo();
