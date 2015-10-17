module.exports = {
  paths: {},
  get: function(path, handler) {
    this.paths[path] = handler
  },
  post: function(path, handler) {
    this.paths[path] = handler
  }
}