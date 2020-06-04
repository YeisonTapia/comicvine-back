'use strict'

const express = require('express')
const asyncify = require('express-asyncify')
const api = asyncify(express.Router())

const comicvineService = require('./services/comicvine')

api.get('/issues', async (req, res, next) => {
  const { filter, limit, offset } = req.query
  let data = {}
  let params = {
    filter,
    limit,
    offset
  }
  try {
    data = await comicvineService('issues', params)
  } catch (e) {
    return next(e)
  }
  res.send(data)
})

module.exports = api
