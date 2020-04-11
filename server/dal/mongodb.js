const MongoClient = require('mongodb').MongoClient
const user = process.env.DB_USER
const password = process.env.DB_PASS

let dbObject = {
  db: null,
  hasDbError: false,
  error: null
}

MongoClient.connect(`mongodb+srv://${user}:${password}@cluster0-dcpop.mongodb.net/test?retryWrites=true&w=majority`, (err, client) => {
  if (err) {
    console.log(err);
    dbObject.error = err
    dbObject.dbError = true
  } else {
    dbObject.db = client.db('test');
  }
})

module.exports = dbObject