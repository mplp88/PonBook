require('dotenv').config()
const bodyParser = require('body-parser');
const cors = require('cors')
const express = require('express')
const api = express()
const dal = require('./dal/mongodb')

const Account = require('./account/account')

// const port = process.env.SERVER_PORT

api.use(cors())
api.use(bodyParser.urlencoded({
  extended: true
}))
api.use(bodyParser.json())

api.get('/api', (req, res) => {
  if (dal.hasDbError) return res.send('<h1>Error connecting to MongoDB. Check server log</h1>')

  return res.send('<h1>API is Online!</h1>')
})

api.use('/api/account', Account)

// app.listen(port, () => {
//   console.log(`Listening on http://localhost:${port}/api`)
// })

module.exports = api;