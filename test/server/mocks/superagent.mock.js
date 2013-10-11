module.exports = {
  response: undefined,
  get: function(url) {
    switch (url) {
      case 'https://api.github.com/meta':
        this.response = {
          body: {
            "hooks": [
              "204.232.175.64/27",
              "192.30.252.0/22"
            ],
            "git": [
              "207.97.227.239/32",
              "192.30.252.0/22"
            ]
          }
        }
        break
    }

    return this
  },
  end: function(callback) {
    callback(this.response)
  }
}