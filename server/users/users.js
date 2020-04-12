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

router.get('/:id', (req, res) => {
  if (dal.hasDbError) return res.send('<h1>Error connecting to MongoDB. Check server log</h1>')

  let regex = new RegExp(req.params.username)

  dal.db.collection('users').find({
    '_id': regex
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

router.get('/find/:username', (req, res) => {
  try {
    let regex = new RegExp(req.params.username)

    dal.db.collection('users').find({
      'username': regex
    }).toArray((err, results) => {
      if (err) {
        console.log(err)

        return res.json({
          ok: false,
          error: err
        })
      }

      let users = [];

      results.forEach(e => {
        let {
          _id,
          username,
          firstName,
          lastName
        } = e

        users.push({
          _id,
          username,
          firstName,
          lastName
        })
      })

      return res.json({
        ok: true,
        results: users
      })
    })
  } catch (e) {
    console.log(e)

    return res.json({
      ok: false,
      error: e
    })
  }
})

router.post('/:id/addFriend', (req, res) => {
  let friendId = req.body.friendId
  let regex = new RegExp(req.params.id)

  dal.db.collection('users').find({
    '_id': regex
  }).toArray((err, result) => {
    if (err) {
      console.log(err)

      return res.json({
        ok: false,
        error: err
      })
    }

    let user = result[0]

    if (!user.friends) {
      user.friends = []
    }

    user.friends.push({
      id: friendId,
      accepted: false
    })

    dal.db.collection('users').findOneAndUpdate({
      '_id': regex
    }, {
      $set: user
    }, {
      returnOriginal: false
    }, (err, result) => {
      if (err) {
        console.log(err)

        return res.json({
          ok: false,
          error: err
        })
      }

      return res.json({
        ok: true,
        user: result.value
      })
    })
  })
})

module.exports = router