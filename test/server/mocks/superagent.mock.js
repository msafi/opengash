module.exports = {
  results: undefined,
  get: function(url) {
    switch (url) {
      case 'https://api.github.com/meta':
        this.results = 'foobar'
        return this
    }
    return this
  },
  end: function(callback) {
    callback(this.results)
  }
}