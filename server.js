'use strict'

const express = require('express')
const http = require('http')
const asyncify = require('express-asyncify')
const app = asyncify(express())
const server = http.createServer(app)

const api = require('./api')
const port = process.env.PORT || 3000

app.use('/api', api)

app.use((err, req, res, next) => {
  console.warn(`Error: ${err.message}`)

  if (err.message.match(/not found/)) {
    return res.status(404).send({ error: err.message })
  }

  res.status(500).send({ error: err.message })
})

function handleFatalError (err) {
  console.error(`${err.message}`)
  console.error(err.stack)
  process.exit(1)
}

process.on('uncaughtException', handleFatalError)
process.on('unhandledRejection', handleFatalError)

server.listen(port, () => {
  console.log(`server listening on port ${port}`)
})
