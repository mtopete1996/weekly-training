const Hapi = require("@hapi/hapi")
const Path = require("path")

module.exports = Hapi.server({
  port: 3000,
  host: "localhost",
  routes: {
    files: {
      relativeTo: Path.join(__dirname, "assets"),
    },
  },
})
