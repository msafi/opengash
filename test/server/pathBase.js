if (process.env.GRUNTFILE)
  module.exports = '../../build/server/'
else
  module.exports = '../../source/server/'