const router = require('express').Router()
const cors = require('cors')
const dal = require('../dal/mongodb')

router.post('/login', (req, res) => {
  if (dal.hasDbError) res.send('Error in DB.\n' + dal.error);

  let user
  let username = req.body.username
  let password = req.body.password
  let regex = new RegExp(username)

  dal.db.collection('users').find({
    "username": regex
  }).toArray((err, results) => {
    if (err) return res.status(400).json(err)
    let temp = results.find(u => u.username == username && u.password == password)
    user = temp ? temp : {}
    return res.json(user)
  })
})

router.post('/updateAccountInfo/:username', (req, res) => {
  if (dal.hasDbError) res.send('Error in DB.\n' + dal.error);

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

    dal.db.collection('users').findOneAndUpdate({
      'username': regex
    }, newValues, {
      returnOriginal: false
    }, (err, result) => {
      if (err) {
        return res.json({
          ok: false,
          error: err
        })
      }

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

router.post('/changePassword/:username', (req, res) => {
  if (dal.hasDbError) res.send('Error in DB.\n' + dal.error);

  try {
    let regex = new RegExp(req.params.username)
    let username = req.params.username;
    let oldPassword = req.body.oldPassword;
    let newPassword = req.body.newPassword;

    dal.db.collection('users').find({
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

      dal.db.collection('users').findOneAndUpdate({
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
    return res.json({
      ok: false,
      error: e
    })
  }
})

router.post('/register', (req, res) => {
  if (dal.hasDbError) res.send('Error in DB.\n' + dal.error);

  try {
    if (!(req.body.username && req.body.password))
      return res.json(new Error('Error de transmisión de datos'))

    dal.db.collection('users').insertOne(req.body, (err, result) => {
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

module.exports = router