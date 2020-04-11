const router = require('express').Router()
const cors = require('cors')
const dal = require('../dal/mongodb')

router.use(cors())

router.get('/', (req, res) => {
  if (dal.hasDbError) return res.send('<h1>Error connecting to MongoDB. Check server log</h1>')

  dal.db.collection('users').find().toArray((err, results) => {
    if (err) {
      console.log(err);

      return res.json({
        ok: false,
        error: err
      })
    }

    let users = []

    results.forEach(e => {
      users.push({
        firstName: e.firstName,
        lastName: e.lastName,
        username: e.username,
        age: e.age
      })
    });

    return res.json(users)
  })
})

router.get('/:username', (req, res) => {
  if (dal.hasDbError) return res.send('<h1>Error connecting to MongoDB. Check server log</h1>')

  let regex = new RegExp(req.params.username)

  dal.db.collection('users').find({
    'username': regex
  }).toArray((err, results) => {
    if (err) {
      console.log(err);

      return res.json({
        ok: false,
        error: err
      })
    }

    let user = {
      firstName: results[0].firstName,
      lastName: results[0].lastName,
      username: results[0].username,
      age: results[0].age
    }

    return res.json(user)
  })
})


module.exports = router