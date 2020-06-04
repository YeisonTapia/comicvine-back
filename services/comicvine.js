'use strict'

const axios = require('axios')

const COMICVINE_URL = process.env.COMICVINE_URL || 'https://comicvine.gamespot.com/api'
const COMICVINE_API_KEY = process.env.COMICVINE_API_KEY || 'b72f944ecb1b2423b5629dbe80b276eacdc4d603'
const COMICVINE_FORMAT = process.env.COMICVINE_FORMAT || 'json'

module.exports = async function (uri, params = {}) {
  params.api_key = COMICVINE_API_KEY
  params.format = COMICVINE_FORMAT
  const url = `${COMICVINE_URL}/${uri}`
  const result = await axios.get(url, {params})
  return result.data
}