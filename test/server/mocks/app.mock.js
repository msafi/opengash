module.exports = {
  paths: [],
  handlers: [],
  get: function(path, handler) {
    this.paths.push(path)
    this.handlers.push(handler)
  },
  post: function(path, handler) {
    this.paths.push(path)
    this.handlers.push(handler)
  }
}