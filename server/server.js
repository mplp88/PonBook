require('dotenv').config()
const MongoClient = require('mongodb').MongoClient
const bodyParser = require('body-parser');
const cors = require('cors')
const express = require('express')
const app = express()

const user = process.env.DB_USER
const password = process.env.DB_PASS
const port = process.env.PORT

let db;

app.use(cors())
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send('<h1>API is Online!</h1>')
})

app.post('/login', (req, res) => {
  let user
  let username = req.body.username
  let password = req.body.password
  let regex = new RegExp(username)

  db.collection('users').find({
    "username": regex
  }).toArray((err, results) => {
    if (err) return res.json(err)

    let temp = results.find(u => u.username == username && u.password == password)
    user = temp ? temp : {}
    return res.json(user)
  })
})

app.post('/updateAccountInfo/:username', (req, res) => {
  console.log(`called updateAccountInfo with username ${req.params.username}`)
  console.log('body', req.body)
  try {
    let newSet = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      age: req.body.age
    }
    let newValues = {
      $set: newSet
    }
    let regex = new RegExp(req.params.username)

    db.collection('users').findOneAndUpdate({
      'username': regex
    }, newValues, {
      returnOriginal: false
    }, (err, result) => {
      if (err) {
        console.log(err);

        return res.json({
          ok: false,
          error: err
        })
      }

      console.log('actualizado!');
      return res.json({
        ok: true,
        result: result.value
      })
    })
  } catch (e) {
    console.log(e);
    return res.json({
      ok: false,
      error: e
    })
  }
})

app.post('/changePassword/:username', (req, res) => {
  console.log(`called changePassword with username ${req.params.username}`)
  console.log('body', req.body)
  try {
    let regex = new RegExp(req.params.username)
    let username = req.params.username;
    let oldPassword = req.body.oldPassword;
    let newPassword = req.body.newPassword;

    db.collection('users').find({
      "username": regex
    }).toArray((err, results) => {
      if (err) return res.json(err)

      let temp = results.find(u => u.username == username && u.password == oldPassword)
      let user = temp._id ? temp : {}

      if (!user._id) {
        return res.json({
          ok: false,
          error: new Error('El password anterior es incorrecto')
        })
      }

      db.collection('users').findOneAndUpdate({
        'username': regex,
      }, {
        $set: {
          password: newPassword
        }
      }, {
        returnOriginal: false
      }, (err, result) => {
        if (err) return res.json({
          ok: false,
          error: err
        })

        return res.json({
          ok: true,
          result: result.value
        })
      })
    })
  } catch (e) {
    console.log(e);
    return res.json({
      ok: false,
      error: e
    })
  }
})

app.post('/register', (req, res) => {
  try {
    if (!(req.body.username && req.body.password))
      return res.json(new Error('Error de transmisión de datos'))

    db.collection('users').insertOne(req.body, (err, result) => {
      if (err) return res.json({
        ok: false,
        error: err
      })

      return res.json({
        ok: true,
        result: result.value
      })
    })
  } catch (e) {
    return res.json({
      ok: false,
      error: e
    })
  }
})

MongoClient.connect(`mongodb+srv://${user}:${password}@cluster0-dcpop.mongodb.net/test?retryWrites=true&w=majority`, (err, client) => {
  if (err) console.log(err)

  db = client.db('test');

  app.listen(port, () => {
    //console.log(db);
    console.log(`Listening on http://localhost:${port}`)
  })
})