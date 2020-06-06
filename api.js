'use strict'

const express = require('express')
const asyncify = require('express-asyncify')
const api = asyncify(express.Router())

const comicvineService = require('./services/comicvine')
const CacheMiddleware = require('./middlewares/cache')

api.get('/:resource', CacheMiddleware(360), async (req, res, next) => {
  const { filter, limit, offset } = req.query
  const { resource } = req.params
  let data = {}
  const params = {
    filter,
    limit,
    offset
  }
  try {
    data = await comicvineService(resource, params)
  } catch (e) {
    return next(e)
  }
  res.send(data)
})

module.exports = api
