before(function() {
  mockery = require('mockery')

  mockery.enable({ warnOnReplace: false, warnOnUnregistered: false, useCleanCache: true })
  mockery.registerSubstitute('../ogGaApi', '../../../test/server/mocks/ogGaApi.mock')
  mockery.registerSubstitute('../ogUtil', '../../../test/server/mocks/ogUtil.mock')
  mockery.registerSubstitute('superagent', '../../../test/server/mocks/superagent.mock')

  base = require('../pathBase')
  ogAccount = require('../' + base + './ogAccount')
  app = require('../' + base + './server.js')
  config = require('../' + base + './config.js')

  request = require('supertest')(app)
  expect = require('expect.js')
  sign = require('express/node_modules/cookie-signature').sign
  urlParser = require('url')
  async = require('async')
  qs = require('querystring')

  signedEmail = "s:" + sign('example@example.com', config.cookieSignature) // Mimic Express cookie signing
  secondSignedEmail = "s:" + sign('fake@example.com', config.cookieSignature)
})