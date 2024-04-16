const express = require('express')
const bodyParser  = require('body-parser')
const server = express()
const { router } = require("../router/router.js")
server.use(bodyParser.json())
server.use(router)
server.get('/ping', (req, res) => {
  res.send('pong')
})

module.exports = {
  server
}