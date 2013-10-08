if (process.env.GRUNTFILE)
  module.exports = '../../build/server/test/'
else
  module.exports = '../../source/server/test/'