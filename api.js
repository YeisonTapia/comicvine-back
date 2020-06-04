'use strict'

const express = require('express')
const asyncify = require('express-asyncify')
const api = asyncify(express.Router())

const comicvineService = require('./services/comicvine')

api.get('/', async (req, res, next) => {
  const { filter, limit, offset, resource } = req.query
  let data = {}
  let params = {
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
